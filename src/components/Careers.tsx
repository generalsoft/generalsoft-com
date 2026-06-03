/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, MapPin, Clock, ArrowRight, X, FileText, CheckCircle2, User, Mail, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { JobPost } from '../types';
import { db, storage, isFirebaseConfigured } from '../firebase.ts';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function Careers() {
  const { language, t, getJobs } = useLanguage();
  const jobsList = getJobs();
  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);
  const [applySubmitted, setApplySubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [captcha, setCaptcha] = useState({ q: '', a: 0 });
  const [userAnswer, setUserAnswer] = useState<string>('');
  
  // Application Form States
  const [candName, setCandName] = useState<string>('');
  const [candEmail, setCandEmail] = useState<string>('');
  const [candResume, setCandResume] = useState<string>('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [candCoverLetter, setCandCoverLetter] = useState<string>('');
  const [candGithub, setCandGithub] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 10) + 1;
    const n2 = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ q: `${n1} + ${n2}`, a: n1 + n2 });
    setUserAnswer('');
  };

  const handleOpenApply = (job: JobPost) => {
    setSelectedJob(job);
    setApplySubmitted(false);
    setIsSubmitting(false);
    setSubmitError(null);
    generateCaptcha();
  };

  const handleCloseApply = () => {
    setSelectedJob(null);
  };

  const handleSubmitApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!candName || !candEmail || !candCoverLetter || !selectedJob) return;

    if (parseInt(userAnswer) !== captcha.a) {
      setSubmitError(t('captcha_error'));
      generateCaptcha();
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    if (resumeFile && resumeFile.size > MAX_FILE_SIZE) {
      setSubmitError(t('error_file_too_large'));
      setIsSubmitting(false);
      return;
    }

    // Increase timeout for file uploads to 90 seconds, 
    // or 15 seconds if it's just a text submission.
    const timeoutDuration = resumeFile ? 90000 : 15000;
    const timeoutPromise = new Promise<never>((_, reject) =>
      window.setTimeout(() => reject(new Error(t('error_timeout'))), timeoutDuration)
    );

    try {
      if (!isFirebaseConfigured || !db || !storage) {
        throw new Error('Firebase is not configured properly.');
      }

      const submissionLogic = async () => {
        let resumeUrl = '';
        if (resumeFile) {
          // Step 1: Binary Upload to Storage
          const storageRef = ref(storage, `resumes/${Date.now()}_${resumeFile.name}`);
          const uploadResult = await uploadBytes(storageRef, resumeFile);
          // Step 2: Get the download URL for the record
          resumeUrl = await getDownloadURL(uploadResult.ref);
        }

        const payload = {
          jobId: selectedJob.id,
          jobTitle: selectedJob.title,
          candidateName: candName,
          candidateEmail: candEmail,
          portfolioUrl: candGithub,
          resumeFilename: candResume,
          resumeUrl,
          coverLetter: candCoverLetter,
          language,
          timestamp: serverTimestamp(),
        };

        // Step 3: Save metadata to Firestore
        await addDoc(collection(db, 'job_applications'), payload);
      };

      await Promise.race([submissionLogic(), timeoutPromise]);
      setApplySubmitted(true);
    } catch (err) {
      const error = err as { code?: string; message?: string };
      console.error('Detailed Submission Error:', error);
      if (error.code === 'storage/unauthorized' || error.code === 'permission-denied' || error.code === 'storage/retry-limit-exceeded') {
        setSubmitError('Security Rules Error: Please check Firebase permissions.');
      } else {
        setSubmitError(error.message || t('error_timeout'));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock file drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setCandResume(file.name);
      setResumeFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setCandResume(file.name);
      setResumeFile(file);
    }
  };

  return (
    <section
      id="careers"
      className="py-24 bg-white px-6 border-b border-slate-100 relative overflow-hidden"
    >
      <div className="absolute bottom-[0%] left-[20%] w-[35%] h-[35%] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full">
        {/* Title */}
        <div className="text-left max-w-3xl mb-16 font-sans">
          <span className="font-mono text-[9px] text-indigo-600 uppercase tracking-widest font-bold block mb-3">{t('careers_sub')}</span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
            {t('careers_title')}
          </h2>
          <p className="mt-4 text-slate-500 font-sans text-sm leading-relaxed font-normal">
            {t('careers_desc')}
          </p>
        </div>

        {/* Jobs List Grid */}
        <div className="space-y-4 font-sans">
          {jobsList.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-slate-200/60 hover:border-indigo-300 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-200 group shadow-sm hover:shadow-md hover:shadow-indigo-50/50"
            >
              <div className="text-left">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded bg-indigo-50 border border-indigo-120 text-indigo-600 font-mono text-[9px] uppercase tracking-wider font-bold">
                    {job.department}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-slate-50 text-slate-500 text-[10px] font-sans font-semibold">
                    {job.type}
                  </span>
                </div>

                <h3 className="font-sans font-extrabold text-slate-800 text-base sm:text-lg group-hover:text-indigo-600 transition-colors">
                  {job.title}
                </h3>

                <div className="flex items-center gap-4 text-slate-450 mt-3 font-sans text-xs">
                  <span className="inline-flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    {job.location}
                  </span>
                </div>

                <p className="mt-4 text-slate-500 font-sans text-xs sm:text-sm leading-relaxed max-w-2xl font-normal">
                  {job.summary}
                </p>
              </div>

              {/* Action */}
              <div className="shrink-0 flex items-center justify-start md:justify-end">
                <button
                  onClick={() => handleOpenApply(job)}
                  className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white border border-slate-100 font-sans text-xs font-bold tracking-wider uppercase transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  {t('careers_apply_btn')}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Global application note */}
        <div className="mt-12 p-6 bg-slate-50 border border-slate-105 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans">
          <div className="text-left">
            <span className="block font-bold text-xs text-slate-800">{t('careers_spontaneous_title')}</span>
            <span className="block font-sans text-[11px] text-slate-450 mt-1 font-medium">{t('careers_spontaneous_desc')}</span>
          </div>
          <button
            onClick={() => handleOpenApply({
              id: 'j-spec',
              title: language === 'de' ? 'Systemarchitekt (Initiativbewerbung)' : 'General Systems Architect (General Application)',
              department: language === 'de' ? 'Systemtechnik' : 'Systems Engineering',
              location: 'Remote',
              type: language === 'de' ? 'Vollzeit / Flexibel' : 'Full-Time / Flexible',
              summary: language === 'de' ? 'Stellen Sie uns Ihren einzigartigen Hintergrund und Ihre Systemprojekte vor. Wir stellen Macher ein.' : 'Pitch us your unique stack background and systems projects. We hire builders who prioritize longevity.',
              requirements: language === 'de' ? ['Erfahrung im Schreiben von Compilern, ASTs oder Kerneloptimierungen.'] : ['Experience writing modular code compilers or custom kernels.']
            })}
            className="px-4.5 py-2.5 rounded-lg bg-indigo-600 hover:bg-slate-900 text-white font-sans text-xs font-semibold tracking-wide cursor-pointer text-center transition-all shadow-sm"
          >
            {t('careers_spontaneous_btn')}
          </button>
        </div>

        {/* Slide-over/Modal Career Form Drawer */}
        <AnimatePresence>
          {selectedJob && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                className="bg-white border border-slate-105 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative font-sans"
              >
                {/* Header inside modal */}
                <div className="px-6 sm:px-8 py-5 border-b border-slate-105 flex items-center justify-between bg-slate-50">
                  <div className="text-left">
                    <span className="block font-mono text-[8px] text-slate-400 tracking-widest font-bold uppercase">{t('modal_applying_sub')}</span>
                    <h3 className="font-sans font-extrabold text-sm sm:text-base text-slate-800 mt-1 leading-tight">
                      {selectedJob.title}
                    </h3>
                  </div>
                  <button
                    onClick={handleCloseApply}
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                    aria-label="Close form"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
                  {!applySubmitted ? (
                    <form onSubmit={handleSubmitApply} className="space-y-6 text-left font-sans">
                      {/* Job summary intro */}
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-105 font-sans text-xs text-slate-600">
                        <span className="block font-bold text-slate-800 mb-1">{t('modal_requirements_title')}</span>
                        <ul className="list-disc pl-4 space-y-1 mt-2 text-slate-500 font-medium leading-relaxed">
                          {selectedJob.requirements.map((req, i) => (
                            <li key={i}>{req}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Inputs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-sans font-bold text-[10px] text-slate-400 uppercase tracking-wider mb-2">
                            {t('modal_label_name')}
                          </label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-440 pointer-events-none">
                              <User className="w-4 h-4 text-slate-400" />
                            </span>
                            <input
                              type="text"
                              required
                              value={candName}
                              onChange={(e) => setCandName(e.target.value)}
                              placeholder={t('modal_placeholder_name')}
                              className="w-full pl-10 pr-4 py-3 bg-white text-slate-800 text-xs rounded-xl border border-slate-205 focus:ring-1 focus:ring-indigo-600 focus:outline-none font-semibold placeholder:text-slate-400"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-sans font-bold text-[10px] text-slate-400 uppercase tracking-wider mb-2">
                            {t('modal_label_email')}
                          </label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-440 pointer-events-none">
                              <Mail className="w-4 h-4 text-slate-400" />
                            </span>
                            <input
                              type="email"
                              required
                              value={candEmail}
                              onChange={(e) => setCandEmail(e.target.value)}
                              placeholder={t('modal_placeholder_email')}
                              className="w-full pl-10 pr-4 py-3 bg-white text-slate-800 text-xs rounded-xl border border-slate-205 focus:ring-1 focus:ring-indigo-600 focus:outline-none font-semibold placeholder:text-slate-400"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-sans font-bold text-[10px] text-slate-400 uppercase tracking-wider mb-2">
                            {t('modal_label_portfolio')}
                          </label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-440 pointer-events-none">
                              <LinkIcon className="w-4 h-4 text-slate-400" />
                            </span>
                            <input
                              type="url"
                              value={candGithub}
                              onChange={(e) => setCandGithub(e.target.value)}
                              placeholder="https://github.com/profile"
                              className="w-full pl-10 pr-4 py-3 bg-white text-slate-800 text-xs rounded-xl border border-slate-205 focus:ring-1 focus:ring-indigo-600 focus:outline-none font-semibold placeholder:text-slate-400"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-sans font-bold text-[10px] text-slate-400 uppercase tracking-wider mb-2">
                            {t('modal_label_resume')}
                          </label>
                          {/* File drop panel */}
                          <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`px-4 py-2.5 rounded-xl border text-center relative cursor-pointer flex items-center justify-between transition-colors ${
                              isDragging
                                ? 'bg-indigo-50 border-indigo-400 text-indigo-600'
                                : 'bg-white border-slate-205 text-slate-450 hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="w-4.5 h-4.5 text-indigo-500 shrink-0" />
                              <span className="font-mono text-[10px] text-slate-700 truncate max-w-[150px] font-semibold">
                                {candResume || t('modal_resume_none')}
                              </span>
                            </div>
                            <label className="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 font-sans text-[9px] uppercase tracking-wider shrink-0 cursor-pointer text-slate-600 font-bold">
                              {t('modal_resume_browse')}
                              <input
                                type="file"
                                accept=".pdf,.docx,.txt"
                                onChange={handleFileSelect}
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Custom Pitch Letter */}
                      <div>
                        <label className="block font-sans font-bold text-[10px] text-slate-400 uppercase tracking-wider mb-2">
                          {t('modal_placeholder_cover')}
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={candCoverLetter}
                          onChange={(e) => setCandCoverLetter(e.target.value)}
                          placeholder={language === 'de' ? 'Erzählen Sie uns über ein Projekt, bei dem Sie Systemspeicher optimiert, CPU-Zyklen reduziert oder Altsysteme modernisiert haben...' : 'Tell us about a time you optimized database query layouts, wrote a compiler parser, or modernization system...'}
                          className="w-full px-4 py-3.5 bg-white text-slate-800 text-xs rounded-xl border border-slate-205 focus:ring-1 focus:ring-indigo-600 focus:outline-none resize-none leading-relaxed font-semibold placeholder:text-slate-400"
                        />
                      </div>

                      {/* Captcha */}
                      <div className="pt-2">
                        <label className="block font-sans font-bold text-[10px] text-slate-400 uppercase tracking-wider mb-2">
                          {t('captcha_label')}
                        </label>
                        <input
                          type="number"
                          required
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          placeholder={t('captcha_placeholder').replace('{q}', captcha.q)}
                          className="w-full max-w-[150px] px-4 py-2.5 bg-slate-50 text-slate-800 text-xs rounded-xl border border-slate-205 focus:ring-1 focus:ring-indigo-600 focus:outline-none font-bold"
                        />
                      </div>

                      {submitError && (
                        <div className="flex items-center gap-2 text-red-600 text-[10px] font-bold uppercase tracking-wider">
                          <AlertCircle className="w-3 h-3" />
                          {submitError}
                        </div>
                      )}

                      {/* CTA Panel */}
                      <div className="border-t border-slate-100 pt-6 flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={handleCloseApply}
                          className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-700 font-sans text-xs transition-colors cursor-pointer font-bold uppercase tracking-wide"
                        >
                          {t('modal_btn_cancel')}
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`px-6 py-2.5 rounded-lg text-white font-sans text-xs font-semibold tracking-wider cursor-pointer active:scale-97 transition-all shadow-sm ${isSubmitting ? 'bg-slate-400 cursor-wait' : 'bg-indigo-600 hover:bg-slate-900'}`}
                        >
                          {isSubmitting ? (resumeFile ? t('btn_uploading') : '...') : t('modal_btn_submit')}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10 space-y-6 font-sans"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mx-auto">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-sans font-extrabold text-slate-800 text-lg sm:text-xl">
                          {t('modal_success_title').replace('{name}', candName)}
                        </h4>
                        <p className="text-slate-550 font-sans text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                          {t('modal_success_desc').replace('{jobTitle}', selectedJob.title)}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-105 text-left max-w-md mx-auto text-xs space-y-3">
                        <span className="block font-bold font-mono uppercase text-[9px] tracking-widest text-indigo-600">
                          {t('modal_success_hr_title')}
                        </span>
                        <p className="text-slate-650 leading-normal font-medium">
                          {t('modal_success_hr_desc').replace('{email}', candEmail)}
                        </p>
                      </div>

                      <button
                        onClick={handleCloseApply}
                        className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-indigo-600 text-white font-sans text-xs font-bold transition-colors cursor-pointer shadow-sm uppercase tracking-wide"
                      >
                        {t('modal_btn_exit')}
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
