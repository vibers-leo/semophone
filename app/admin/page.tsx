'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  MessageSquare, FileText, CheckCircle, AlertCircle,
  ChevronRight, Globe, MapPin, RefreshCw,
} from 'lucide-react';

type Contact = {
  id: number; name: string; phone: string; email: string | null;
  message: string; inquiry_type: string; subject: string | null;
  resume_url: string | null; resume_file_name: string | null;
  status: string; workflow_status: string; created_at: string;
};

type Application = {
  id: number; name: string; phone: string; email: string | null;
  position: string | null; region: string | null; message: string | null;
  resume_url: string | null; resume_file_name: string | null;
  status: string; admin_memo: string | null; created_at: string;
};

const WORKFLOW_LABELS: Record<string, { label: string; color: string }> = {
  received:   { label: '접수',   color: 'bg-blue-100 text-blue-700' },
  consulting: { label: '상담중', color: 'bg-yellow-100 text-yellow-700' },
  visited:    { label: '방문',   color: 'bg-purple-100 text-purple-700' },
  contracted: { label: '계약',   color: 'bg-green-100 text-green-700' },
  closed:     { label: '종료',   color: 'bg-gray-100 text-gray-500' },
};

const APP_STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending:   { label: '대기중', color: 'bg-yellow-100 text-yellow-700' },
  reviewing: { label: '검토중', color: 'bg-blue-100 text-blue-700' },
  accepted:  { label: '합격',   color: 'bg-green-100 text-green-700' },
  rejected:  { label: '불합격', color: 'bg-red-100 text-red-600' },
};

function Badge({ status, map }: { status: string; map: Record<string, { label: string; color: string }> }) {
  const item = map[status] || { label: status, color: 'bg-gray-100 text-gray-500' };
  return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${item.color}`}>{item.label}</span>;
}

function fmt(str: string) {
  const d = new Date(str);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

// ── 대시보드 ──────────────────────────────────────────

function DashboardTab({ contacts, applications }: { contacts: Contact[]; applications: Application[] }) {
  const stats = [
    { icon: MessageSquare, label: '전체 문의',  value: contacts.length,                                              color: 'bg-blue-50 text-blue-600' },
    { icon: AlertCircle,   label: '미처리 문의', value: contacts.filter(c => c.workflow_status === 'received').length, color: 'bg-yellow-50 text-yellow-600' },
    { icon: CheckCircle,   label: '계약 완료',  value: contacts.filter(c => c.workflow_status === 'contracted').length, color: 'bg-green-50 text-green-600' },
    { icon: FileText,      label: '신규 지원서', value: applications.filter(a => a.status === 'pending').length,       color: 'bg-purple-50 text-purple-600' },
  ];
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-lg font-bold text-gray-900">대시보드</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${color}`}><Icon size={20} /></div>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            <div className="text-sm text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">최근 문의</h3>
          <span className="text-xs text-gray-400">{contacts.length}건</span>
        </div>
        <div className="divide-y divide-gray-50">
          {contacts.slice(0, 5).map(c => (
            <div key={c.id} className="px-5 py-3 flex items-center justify-between">
              <div><span className="font-medium text-sm text-gray-800">{c.name}</span><span className="ml-2 text-xs text-gray-400">{c.phone}</span></div>
              <div className="flex items-center gap-2">
                <Badge status={c.workflow_status} map={WORKFLOW_LABELS} />
                <span className="text-xs text-gray-400">{fmt(c.created_at)}</span>
              </div>
            </div>
          ))}
          {contacts.length === 0 && <div className="py-10 text-center text-sm text-gray-400">문의 내역이 없습니다</div>}
        </div>
      </div>
    </div>
  );
}

// ── 문의관리 ──────────────────────────────────────────

function InquiriesTab({ contacts, onUpdate }: { contacts: Contact[]; onUpdate: () => void }) {
  const [selected, setSelected] = useState<Contact | null>(null);
  const [saving, setSaving] = useState(false);
  const [workflow, setWorkflow] = useState('');

  const openDetail = (c: Contact) => { setSelected(c); setWorkflow(c.workflow_status); };
  const save = async () => {
    if (!selected) return;
    setSaving(true);
    await fetch(`/api/admin/contacts/${selected.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ workflow_status: workflow }) });
    setSaving(false); setSelected(null); onUpdate();
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-bold text-gray-900">문의관리</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-4 py-3 text-left">이름</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">연락처</th>
              <th className="px-4 py-3 text-left hidden lg:table-cell">유형</th>
              <th className="px-4 py-3 text-left">상태</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">접수일</th>
              <th className="px-4 py-3 w-8"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {contacts.map(c => (
              <tr key={c.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => openDetail(c)}>
                <td className="px-4 py-3 font-medium text-gray-800">{c.name}</td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{c.phone}</td>
                <td className="px-4 py-3 text-gray-400 hidden lg:table-cell">{c.inquiry_type}</td>
                <td className="px-4 py-3"><Badge status={c.workflow_status} map={WORKFLOW_LABELS} /></td>
                <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{fmt(c.created_at)}</td>
                <td className="px-4 py-3"><ChevronRight size={16} className="text-gray-300" /></td>
              </tr>
            ))}
          </tbody>
        </table>
        {contacts.length === 0 && <div className="py-12 text-center text-sm text-gray-400">접수된 문의가 없습니다</div>}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="font-bold text-gray-900">문의 상세</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-gray-400 block text-xs mb-1">이름</span><span className="font-medium">{selected.name}</span></div>
                <div><span className="text-gray-400 block text-xs mb-1">연락처</span><a href={`tel:${selected.phone}`} className="font-medium text-blue-600">{selected.phone}</a></div>
                {selected.email && <div className="col-span-2"><span className="text-gray-400 block text-xs mb-1">이메일</span><span>{selected.email}</span></div>}
                <div><span className="text-gray-400 block text-xs mb-1">접수일</span><span>{fmt(selected.created_at)}</span></div>
                <div><span className="text-gray-400 block text-xs mb-1">유형</span><span>{selected.inquiry_type}</span></div>
              </div>
              <div>
                <span className="text-gray-400 block text-xs mb-1">문의 내용</span>
                <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 whitespace-pre-wrap">{selected.message}</p>
              </div>
              {selected.resume_url && (
                <a href={selected.resume_url} target="_blank" rel="noreferrer" className="text-sm text-blue-600 underline block">
                  {selected.resume_file_name || '이력서 보기'}
                </a>
              )}
              <div>
                <span className="text-gray-400 block text-xs mb-2">진행 상태 변경</span>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(WORKFLOW_LABELS).map(([key, { label, color }]) => (
                    <button key={key} onClick={() => setWorkflow(key)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border-2 ${workflow === key ? 'border-gray-800 ' + color : 'border-transparent ' + color + ' opacity-50'}`}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2 sticky bottom-0 bg-white">
              <button onClick={() => setSelected(null)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">취소</button>
              <button onClick={save} disabled={saving} className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50">
                {saving ? '저장중...' : '저장'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── 지원서관리 ──────────────────────────────────────────

function ApplicationsTab({ applications, onUpdate }: { applications: Application[]; onUpdate: () => void }) {
  const [selected, setSelected] = useState<Application | null>(null);
  const [saving, setSaving] = useState(false);
  const [appStatus, setAppStatus] = useState('');
  const [memo, setMemo] = useState('');

  const openDetail = (a: Application) => { setSelected(a); setAppStatus(a.status); setMemo(a.admin_memo || ''); };
  const save = async () => {
    if (!selected) return;
    setSaving(true);
    await fetch(`/api/admin/applications/${selected.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: appStatus, admin_memo: memo }) });
    setSaving(false); setSelected(null); onUpdate();
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-bold text-gray-900">지원서관리</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-4 py-3 text-left">이름</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">연락처</th>
              <th className="px-4 py-3 text-left hidden lg:table-cell">지원 직무</th>
              <th className="px-4 py-3 text-left">상태</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">지원일</th>
              <th className="px-4 py-3 w-8"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {applications.map(a => (
              <tr key={a.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => openDetail(a)}>
                <td className="px-4 py-3 font-medium text-gray-800">{a.name}</td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{a.phone}</td>
                <td className="px-4 py-3 text-gray-400 hidden lg:table-cell">{a.position || '-'}</td>
                <td className="px-4 py-3"><Badge status={a.status} map={APP_STATUS_LABELS} /></td>
                <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{fmt(a.created_at)}</td>
                <td className="px-4 py-3"><ChevronRight size={16} className="text-gray-300" /></td>
              </tr>
            ))}
          </tbody>
        </table>
        {applications.length === 0 && <div className="py-12 text-center text-sm text-gray-400">접수된 지원서가 없습니다</div>}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="font-bold text-gray-900">지원서 상세</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-gray-400 block text-xs mb-1">이름</span><span className="font-medium">{selected.name}</span></div>
                <div><span className="text-gray-400 block text-xs mb-1">연락처</span><a href={`tel:${selected.phone}`} className="text-blue-600">{selected.phone}</a></div>
                <div><span className="text-gray-400 block text-xs mb-1">지원 직무</span><span>{selected.position || '-'}</span></div>
                <div><span className="text-gray-400 block text-xs mb-1">지원 지역</span><span>{selected.region || '-'}</span></div>
              </div>
              {selected.message && (
                <div>
                  <span className="text-gray-400 block text-xs mb-1">자기소개</span>
                  <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 whitespace-pre-wrap">{selected.message}</p>
                </div>
              )}
              {selected.resume_url && (
                <a href={selected.resume_url} target="_blank" rel="noreferrer" className="text-sm text-blue-600 underline block">
                  {selected.resume_file_name || '이력서 보기'}
                </a>
              )}
              <div>
                <span className="text-gray-400 block text-xs mb-2">전형 상태</span>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(APP_STATUS_LABELS).map(([key, { label, color }]) => (
                    <button key={key} onClick={() => setAppStatus(key)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border-2 ${appStatus === key ? 'border-gray-800 ' + color : 'border-transparent ' + color + ' opacity-50'}`}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-gray-400 block text-xs mb-1">관리자 메모</span>
                <textarea value={memo} onChange={e => setMemo(e.target.value)} rows={3}
                  placeholder="내부 메모를 입력하세요..."
                  className="w-full text-sm border border-gray-200 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-gray-300" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2 sticky bottom-0 bg-white">
              <button onClick={() => setSelected(null)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">취소</button>
              <button onClick={save} disabled={saving} className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50">
                {saving ? '저장중...' : '저장'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── 사이트설정 ──────────────────────────────────────────

function SettingsTab() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-lg font-bold text-gray-900">사이트설정</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-semibold text-sm text-gray-700 mb-4 flex items-center gap-2"><Globe size={16} />기본 정보</h3>
          <dl className="space-y-3 text-sm">
            {[
              { label: '서비스명',       value: '세모폰' },
              { label: '도메인',         value: 'semophone.co.kr' },
              { label: '운영사',         value: '주식회사 승승장구' },
              { label: '수신 이메일',    value: 'admin@semophone.co.kr' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between">
                <dt className="text-gray-400">{label}</dt>
                <dd className="font-medium text-right">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-semibold text-sm text-gray-700 mb-4 flex items-center gap-2"><MapPin size={16} />SEO 도구</h3>
          <div className="space-y-1">
            {[
              { label: '네이버 서치어드바이저', href: 'https://searchadvisor.naver.com' },
              { label: '구글 서치콘솔',         href: 'https://search.google.com/search-console' },
              { label: 'PageSpeed Insights',    href: 'https://pagespeed.web.dev' },
            ].map(link => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer"
                className="flex items-center justify-between text-sm text-blue-600 hover:underline py-1.5">
                {link.label}<ChevronRight size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 메인 ──────────────────────────────────────────────

function AdminPageInner() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'dashboard';
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const [cRes, aRes] = await Promise.all([fetch('/api/admin/contacts'), fetch('/api/admin/applications')]);
    if (cRes.ok) setContacts(await cRes.json());
    if (aRes.ok) setApplications(await aRes.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <RefreshCw size={20} className="animate-spin text-gray-400" />
    </div>
  );

  if (activeTab === 'inquiries') return <InquiriesTab contacts={contacts} onUpdate={load} />;
  if (activeTab === 'applications') return <ApplicationsTab applications={applications} onUpdate={load} />;
  if (activeTab === 'settings') return <SettingsTab />;
  return <DashboardTab contacts={contacts} applications={applications} />;
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-64"><RefreshCw size={20} className="animate-spin text-gray-400" /></div>}>
      <AdminPageInner />
    </Suspense>
  );
}
