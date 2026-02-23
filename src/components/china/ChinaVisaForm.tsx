"use client";

import { useState } from "react";
import { CitizenshipChecker } from "@/components/ui/citizenship-checker";

// Step components (inline for now, will extract later)
function StepProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
            i + 1 === current
              ? "bg-[#cc0000] text-white scale-110"
              : i + 1 < current
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          {i + 1 < current ? "✓" : i + 1}
        </div>
      ))}
      <span className="ml-2 text-sm text-gray-500">{current}/{total}</span>
    </div>
  );
}

// Vietnam airports for entry port selection
const VIETNAM_AIRPORTS = [
  { code: "SGN", name: "胡志明市 (新山一机场)", city: "HCM" },
  { code: "HAN", name: "河内 (内排机场)", city: "HN" },
  { code: "DAD", name: "岘港 (岘港机场)", city: "DN" },
  { code: "CXR", name: "芽庄 (金兰机场)", city: "KH" },
  { code: "PQC", name: "富国岛 (富国机场)", city: "PQ" },
  { code: "HPH", name: "海防 (吉碑机场)", city: "HP" },
];

// Uses existing CitizenshipChecker component which has all visa eligibility logic


interface FormData {
  // Step 1: Visa Requirements
  nationality: string;
  departureCountry: string;
  purpose: string;

  // Step 2: Photo
  portraitPhotoUrl: string | null;
  originalPhotoUrl: string | null;

  // Step 3: Passport
  passportPhotoUrl: string | null;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  passportNationality: string;
  passportNumber: string;
  passportIssuingCountry: string;
  passportIssueDate: string;
  passportExpiry: string;

  // Step 4: Flight
  flightNumber: string;
  flightDate: string;
  entryDate: string;
  entryPort: string;
  entryType: "single" | "multiple";
  addressInVietnam: string;

  // Step 5: Contact & Payment
  email: string;
  whatsapp: string;
  visaSpeed: "30-min" | "4-hour" | "1-day";
}

export default function ChinaVisaForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    // Defaults
    nationality: "CN",
    departureCountry: "CN",
    purpose: "tourism",
    portraitPhotoUrl: null,
    originalPhotoUrl: null,
    passportPhotoUrl: null,
    fullName: "",
    dateOfBirth: "",
    gender: "",
    passportNationality: "",
    passportNumber: "",
    passportIssuingCountry: "",
    passportIssueDate: "",
    passportExpiry: "",
    flightNumber: "",
    flightDate: "",
    entryDate: "",
    entryPort: "",
    entryType: "single",
    addressInVietnam: "",
    email: "",
    whatsapp: "",
    visaSpeed: "30-min",
  });

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const goToStep = (step: number) => setCurrentStep(step);

  return (
    <div
      className="min-h-screen bg-[#f5f5f5]"
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
      }}
    >
      <div className="max-w-[430px] mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="bg-[#cc0000] text-white px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold">越南签证申请</h1>
            <span className="text-sm opacity-80">Vietnam Visa</span>
          </div>
        </div>

        {/* Progress */}
        <StepProgress current={currentStep} total={5} />

        {/* Step Content */}
        <div className="px-4 pb-24">
          {currentStep === 1 && (
            <Step1VisaRequirements
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
            />
          )}
          {currentStep === 2 && (
            <Step2Photo
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
              onPrev={prevStep}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
            />
          )}
          {currentStep === 3 && (
            <Step3Passport
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
              onPrev={prevStep}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
            />
          )}
          {currentStep === 4 && (
            <Step4Flight
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
              onPrev={prevStep}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
            />
          )}
          {currentStep === 5 && (
            <Step5Confirm
              formData={formData}
              updateFormData={updateFormData}
              onPrev={prevStep}
              goToStep={goToStep}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ==================== STEP 1: Visa Requirements ====================
// Uses existing CitizenshipChecker component from the working websites
function Step1VisaRequirements({
  formData,
  updateFormData,
  onNext,
}: {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
}) {
  const [isEligible, setIsEligible] = useState(true); // Default CN is eligible

  const handleCountrySelect = (code: string, requirement: { type: string }) => {
    updateFormData({ nationality: code });
    // Enable next button only for evisa or visa_free
    setIsEligible(requirement.type === "evisa" || requirement.type === "visa_free");
  };

  const handlePurposeChange = (purpose: string) => {
    updateFormData({ purpose });
  };

  const handleDepartingCountryChange = (code: string) => {
    updateFormData({ departureCountry: code });
  };

  return (
    <div className="space-y-6">
      {/* Use existing CitizenshipChecker component */}
      <CitizenshipChecker
        onCountrySelect={handleCountrySelect}
        onPurposeChange={handlePurposeChange}
        onDepartingCountryChange={handleDepartingCountryChange}
        initialPurpose={formData.purpose}
      />

      {/* Next Button - Green when eligible, Gray when not */}
      <button
        onClick={onNext}
        disabled={!isEligible}
        className={`w-full h-14 text-white rounded-xl font-bold text-lg transition-all ${
          isEligible
            ? "bg-[#22c55e] hover:bg-[#16a34a] shadow-lg"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        {isEligible ? "下一步 (Next) →" : "无法在线申请"}
      </button>
    </div>
  );
}

// ==================== STEP 2: Photo Upload ====================
function Step2Photo({
  formData,
  updateFormData,
  onNext,
  onPrev,
  setIsLoading,
  isLoading,
}: {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  setIsLoading: (loading: boolean) => void;
  isLoading: boolean;
}) {
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);

    // Show original preview
    const originalUrl = URL.createObjectURL(file);
    updateFormData({ originalPhotoUrl: originalUrl });

    try {
      // Call photo processing API
      const formDataApi = new FormData();
      formDataApi.append("file", file);
      formDataApi.append("applicantId", `temp-${Date.now()}`);

      const response = await fetch("/api/process-photo", {
        method: "POST",
        body: formDataApi,
      });

      if (response.ok) {
        const result = await response.json();
        updateFormData({ portraitPhotoUrl: result.dataUrl || result.url || originalUrl });
      } else {
        // If processing fails, use original with success message (for testing)
        console.log("Photo API not available, using original for testing");
        updateFormData({ portraitPhotoUrl: originalUrl });
      }
    } catch (error) {
      console.error("Photo processing error:", error);
      // For localhost testing - use original photo
      updateFormData({ portraitPhotoUrl: originalUrl });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center py-4">
        <h2 className="text-xl font-bold text-gray-800">上传证件照</h2>
        <p className="text-sm text-gray-500 mt-1">Upload or Take a Photo</p>
      </div>

      {/* Trust Message */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-blue-500 text-xl">✨</span>
          <div>
            <div className="font-medium text-blue-800">自动处理</div>
            <div className="text-sm text-blue-600 mt-1">
              背景自动去除，照片自动调整为4x6cm签证尺寸
            </div>
            <div className="text-xs text-blue-500 mt-1">
              Background removed automatically, resized to 4x6cm
            </div>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      {!formData.portraitPhotoUrl ? (
        <label className="block">
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer hover:border-[#cc0000] transition-colors">
            {isLoading ? (
              <div className="py-8">
                <div className="w-12 h-12 border-4 border-[#cc0000] border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-gray-600">正在处理照片...</p>
                <p className="text-sm text-gray-400">Processing photo...</p>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📷</span>
                </div>
                <p className="text-gray-700 font-medium">点击上传或拍摄照片</p>
                <p className="text-sm text-gray-500 mt-1">Tap to upload or take selfie</p>
                <p className="text-xs text-gray-400 mt-3">支持 JPG, PNG 格式</p>
              </>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            capture="user"
            onChange={handlePhotoUpload}
            className="hidden"
            disabled={isLoading}
          />
        </label>
      ) : (
        <div className="space-y-4">
          {/* Before/After Preview */}
          <div className="grid grid-cols-2 gap-4">
            {formData.originalPhotoUrl && (
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-2">原图</p>
                <img
                  src={formData.originalPhotoUrl}
                  alt="Original"
                  className="w-full aspect-[3/4] object-cover rounded-xl border"
                />
              </div>
            )}
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">处理后 (4x6cm)</p>
              <img
                src={formData.portraitPhotoUrl}
                alt="Processed"
                className="w-full aspect-[3/4] object-cover rounded-xl border-2 border-green-500"
              />
            </div>
          </div>

          {/* Re-upload button */}
          <label className="block">
            <div className="text-center py-3 text-[#cc0000] cursor-pointer">
              重新上传 (Re-upload)
            </div>
            <input
              type="file"
              accept="image/*"
              capture="user"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </label>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={onPrev}
          className="flex-1 h-14 border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all"
        >
          ← 上一步
        </button>
        <button
          onClick={onNext}
          disabled={!formData.portraitPhotoUrl || isLoading}
          className={`flex-1 h-14 text-white rounded-xl font-bold text-lg shadow-lg transition-all disabled:bg-gray-300 disabled:shadow-none ${
            formData.portraitPhotoUrl && !isLoading
              ? "bg-[#22c55e] hover:bg-[#16a34a]"
              : "bg-gray-300"
          }`}
        >
          下一步 →
        </button>
      </div>
    </div>
  );
}

// ==================== STEP 3: Passport Upload ====================
function Step3Passport({
  formData,
  updateFormData,
  onNext,
  onPrev,
  setIsLoading,
  isLoading,
}: {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  setIsLoading: (loading: boolean) => void;
  isLoading: boolean;
}) {
  const [ocrError, setOcrError] = useState<string | null>(null);

  const handlePassportUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setOcrError(null);

    // Show preview
    const previewUrl = URL.createObjectURL(file);
    updateFormData({ passportPhotoUrl: previewUrl });

    try {
      // Call passport scan API
      const formDataApi = new FormData();
      formDataApi.append("file", file);

      const response = await fetch("/api/passport-scan", {
        method: "POST",
        body: formDataApi,
      });

      const result = await response.json();

      if (result.success && result.data) {
        updateFormData({
          fullName: result.data.fullName || "",
          dateOfBirth: result.data.dateOfBirth || "",
          gender: result.data.gender || "",
          passportNationality: result.data.nationality || formData.nationality || "",
          passportNumber: result.data.passportNumber || "",
          passportIssuingCountry: result.data.issuingAuthority || result.data.nationality || formData.nationality || "",
          passportIssueDate: result.data.dateOfIssue || "",
          passportExpiry: result.data.passportExpiry || "",
        });
      } else {
        // For localhost testing - show mock data option
        console.log("Passport API not available, please enter manually");
        setOcrError("API不可用，请手动输入 (API unavailable - enter manually)");
        // Pre-fill with defaults
        updateFormData({
          fullName: "",
          dateOfBirth: "",
          gender: "",
          passportNationality: formData.nationality || "",
          passportNumber: "",
          passportIssuingCountry: formData.nationality || "",
          passportIssueDate: "",
          passportExpiry: "",
        });
      }
    } catch (error) {
      console.error("Passport scan error:", error);
      setOcrError("识别失败，请手动输入 (Enter manually for testing)");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center py-4">
        <h2 className="text-xl font-bold text-gray-800">上传护照照片</h2>
        <p className="text-sm text-gray-500 mt-1">Upload Passport Photo</p>
      </div>

      {/* Info */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-amber-500 text-xl">📄</span>
          <div>
            <div className="font-medium text-amber-800">拍摄护照信息页</div>
            <div className="text-sm text-amber-600 mt-1">
              系统将自动读取您的护照信息
            </div>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      {!formData.passportPhotoUrl ? (
        <label className="block">
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer hover:border-[#cc0000] transition-colors">
            {isLoading ? (
              <div className="py-8">
                <div className="w-12 h-12 border-4 border-[#cc0000] border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-gray-600">正在识别护照...</p>
                <p className="text-sm text-gray-400">Reading passport...</p>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🛂</span>
                </div>
                <p className="text-gray-700 font-medium">点击上传护照照片</p>
                <p className="text-sm text-gray-500 mt-1">Tap to upload passport photo</p>
              </>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handlePassportUpload}
            className="hidden"
            disabled={isLoading}
          />
        </label>
      ) : (
        <div className="space-y-4">
          {/* Passport Preview */}
          <div className="text-center">
            <img
              src={formData.passportPhotoUrl}
              alt="Passport"
              className="max-h-40 mx-auto rounded-xl border"
            />
            <label className="block mt-2">
              <span className="text-sm text-[#cc0000] cursor-pointer">重新上传</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePassportUpload}
                className="hidden"
              />
            </label>
          </div>

          {ocrError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm">
              {ocrError}
            </div>
          )}

          {/* Extracted Data */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <h3 className="font-medium text-gray-700">识别结果 (可编辑)</h3>

            <div>
              <label className="block text-xs text-gray-500 mb-1">姓名 (Full Name)</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => updateFormData({ fullName: e.target.value })}
                className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm"
                placeholder="如: ZHANG SAN"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">出生日期 (DOB)</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateFormData({ dateOfBirth: e.target.value })}
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">性别 (Gender)</label>
                <select
                  value={formData.gender}
                  onChange={(e) => updateFormData({ gender: e.target.value })}
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="">选择</option>
                  <option value="male">男 (Male)</option>
                  <option value="female">女 (Female)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">国籍 (Nationality)</label>
              <input
                type="text"
                value={formData.passportNationality}
                onChange={(e) => updateFormData({ passportNationality: e.target.value })}
                className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm"
                placeholder="如: CHINA"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">护照号码 (Passport No.)</label>
              <input
                type="text"
                value={formData.passportNumber}
                onChange={(e) => updateFormData({ passportNumber: e.target.value })}
                className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm"
                placeholder="如: E12345678"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">签发国 (Issuing Country)</label>
              <input
                type="text"
                value={formData.passportIssuingCountry}
                onChange={(e) => updateFormData({ passportIssuingCountry: e.target.value })}
                className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm"
                placeholder="如: CHINA"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">签发日期 (Issue Date)</label>
                <input
                  type="date"
                  value={formData.passportIssueDate}
                  onChange={(e) => updateFormData({ passportIssueDate: e.target.value })}
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">有效期 (Expiry Date)</label>
                <input
                  type="date"
                  value={formData.passportExpiry}
                  onChange={(e) => updateFormData({ passportExpiry: e.target.value })}
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={onPrev}
          className="flex-1 h-14 border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all"
        >
          ← 上一步
        </button>
        <button
          onClick={onNext}
          disabled={!formData.fullName || !formData.passportNumber || isLoading}
          className={`flex-1 h-14 text-white rounded-xl font-bold text-lg shadow-lg transition-all disabled:bg-gray-300 disabled:shadow-none ${
            formData.fullName && formData.passportNumber && !isLoading
              ? "bg-[#22c55e] hover:bg-[#16a34a]"
              : "bg-gray-300"
          }`}
        >
          下一步 →
        </button>
      </div>
    </div>
  );
}

// ==================== STEP 4: Flight Information ====================
function Step4Flight({
  formData,
  updateFormData,
  onNext,
  onPrev,
  setIsLoading,
  isLoading,
}: {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  setIsLoading: (loading: boolean) => void;
  isLoading: boolean;
}) {
  const [flightError, setFlightError] = useState<string | null>(null);
  const [flightFound, setFlightFound] = useState(false);

  const searchFlight = async () => {
    if (!formData.flightNumber || !formData.flightDate) return;

    setIsLoading(true);
    setFlightError(null);
    setFlightFound(false);

    try {
      const response = await fetch(
        `/api/flight-info?flight=${formData.flightNumber}&date=${formData.flightDate}`
      );
      const result = await response.json();

      if (result.arrival) {
        // Extract airport code from arrival info
        const arrivalAirportMatch = result.arrival.airport?.match(/\(([A-Z]{3})\)/);
        const arrivalCode = arrivalAirportMatch?.[1] || "";

        updateFormData({
          entryPort: arrivalCode,
          entryDate: result.arrival.scheduledTime?.split("T")[0] || formData.flightDate,
        });
        setFlightFound(true);
      } else {
        setFlightError("未找到航班信息，请手动选择");
      }
    } catch (error) {
      console.error("Flight search error:", error);
      setFlightError("查询失败，请手动选择");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center py-4">
        <h2 className="text-xl font-bold text-gray-800">航班信息</h2>
        <p className="text-sm text-gray-500 mt-1">Flight Information</p>
      </div>

      {/* Flight Number Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          航班号 <span className="text-gray-400">(Flight Number)</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={formData.flightNumber}
            onChange={(e) => updateFormData({ flightNumber: e.target.value.toUpperCase() })}
            placeholder="如: VN123, CZ3456"
            className="flex-1 h-12 px-4 border border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-[#cc0000] focus:border-transparent"
          />
        </div>
      </div>

      {/* Flight Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          航班日期 <span className="text-gray-400">(Flight Date)</span>
        </label>
        <input
          type="date"
          value={formData.flightDate}
          onChange={(e) => updateFormData({ flightDate: e.target.value })}
          className="w-full h-12 px-4 border border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-[#cc0000] focus:border-transparent"
        />
      </div>

      {/* Search Flight Button */}
      <button
        onClick={searchFlight}
        disabled={!formData.flightNumber || !formData.flightDate || isLoading}
        className="w-full h-12 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-all disabled:bg-gray-300"
      >
        {isLoading ? "查询中..." : "查询航班 (Search Flight)"}
      </button>

      {flightFound && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center gap-2 text-green-700">
            <span>✓</span>
            <span className="font-medium">已查询到航班信息</span>
          </div>
        </div>
      )}

      {flightError && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-700 text-sm">
          {flightError}
        </div>
      )}

      {/* Manual Entry */}
      <div className="border-t pt-4">
        <p className="text-sm text-gray-500 mb-3">或手动选择入境信息:</p>

        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">入境日期</label>
            <input
              type="date"
              value={formData.entryDate}
              onChange={(e) => updateFormData({ entryDate: e.target.value })}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">入境机场</label>
            <select
              value={formData.entryPort}
              onChange={(e) => updateFormData({ entryPort: e.target.value })}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm"
            >
              <option value="">选择机场</option>
              {VIETNAM_AIRPORTS.map((a) => (
                <option key={a.code} value={a.code}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Entry Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          签证类型 <span className="text-gray-400">(Visa Type)</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => updateFormData({ entryType: "single" })}
            className={`h-16 rounded-xl border-2 transition-all ${
              formData.entryType === "single"
                ? "border-[#cc0000] bg-red-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="font-medium">单次入境</div>
            <div className="text-xs text-gray-500">Single Entry</div>
          </button>
          <button
            onClick={() => updateFormData({ entryType: "multiple" })}
            className={`h-16 rounded-xl border-2 transition-all ${
              formData.entryType === "multiple"
                ? "border-[#cc0000] bg-red-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="font-medium">多次入境</div>
            <div className="text-xs text-gray-500">Multiple +¥216</div>
          </button>
        </div>
      </div>

      {/* Hotel */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          越南住宿 <span className="text-gray-400">(Hotel in Vietnam)</span>
        </label>
        <input
          type="text"
          value={formData.addressInVietnam}
          onChange={(e) => updateFormData({ addressInVietnam: e.target.value })}
          placeholder="酒店名称，如: Rex Hotel"
          className="w-full h-12 px-4 border border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-[#cc0000] focus:border-transparent"
        />
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={onPrev}
          className="flex-1 h-14 border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all"
        >
          ← 上一步
        </button>
        <button
          onClick={onNext}
          disabled={!formData.entryDate || !formData.entryPort || isLoading}
          className={`flex-1 h-14 text-white rounded-xl font-bold text-lg shadow-lg transition-all disabled:bg-gray-300 disabled:shadow-none ${
            formData.entryDate && formData.entryPort && !isLoading
              ? "bg-[#22c55e] hover:bg-[#16a34a]"
              : "bg-gray-300"
          }`}
        >
          下一步 →
        </button>
      </div>
    </div>
  );
}

// ==================== STEP 5: Confirm & Pay ====================
function Step5Confirm({
  formData,
  updateFormData,
  onPrev,
  goToStep,
  isLoading,
  setIsLoading,
}: {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onPrev: () => void;
  goToStep: (step: number) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}) {
  const [termsAccepted, setTermsAccepted] = useState(false);

  const PRICES = {
    "30-min": { usd: 199, cny: 1433 },
    "4-hour": { usd: 139, cny: 1001 },
    "1-day": { usd: 99, cny: 713 },
  };

  const selectedPrice = PRICES[formData.visaSpeed];
  const multipleEntryFee = formData.entryType === "multiple" ? 216 : 0;
  const totalCNY = selectedPrice.cny + multipleEntryFee;

  const handleSubmit = async () => {
    if (!termsAccepted) return;
    setIsLoading(true);

    // TODO: Submit to API and redirect to payment
    console.log("Submitting form:", formData);

    setTimeout(() => {
      setIsLoading(false);
      alert("表单提交成功! (Demo - would redirect to payment)");
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <div className="text-center py-2">
        <h2 className="text-xl font-bold text-gray-800">确认信息</h2>
        <p className="text-sm text-gray-500 mt-1">Confirm & Pay</p>
      </div>

      {/* Summary Cards */}
      <div className="space-y-3">
        {/* Passport Info */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">护照信息</span>
            <button onClick={() => goToStep(3)} className="text-[#cc0000] text-sm">
              编辑
            </button>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <p>姓名: {formData.fullName}</p>
            <p>国籍: {formData.passportNationality}</p>
            <p>护照号: {formData.passportNumber}</p>
            <p>签发国: {formData.passportIssuingCountry}</p>
            <p>签发日期: {formData.passportIssueDate}</p>
            <p>有效期: {formData.passportExpiry}</p>
          </div>
        </div>

        {/* Photo */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">证件照</span>
            <button onClick={() => goToStep(2)} className="text-[#cc0000] text-sm">
              编辑
            </button>
          </div>
          {formData.portraitPhotoUrl && (
            <img src={formData.portraitPhotoUrl} alt="Photo" className="w-16 h-20 object-cover rounded" />
          )}
        </div>

        {/* Trip Info */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">行程信息</span>
            <button onClick={() => goToStep(4)} className="text-[#cc0000] text-sm">
              编辑
            </button>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <p>入境日期: {formData.entryDate}</p>
            <p>入境机场: {VIETNAM_AIRPORTS.find(a => a.code === formData.entryPort)?.name || formData.entryPort}</p>
            <p>签证类型: {formData.entryType === "single" ? "单次入境" : "多次入境"}</p>
            <p>住宿: {formData.addressInVietnam}</p>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-3">
        <h3 className="font-medium text-gray-700">联系方式</h3>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          placeholder="邮箱 (Email)"
          className="w-full h-12 px-4 border border-gray-300 rounded-xl"
        />
        <input
          type="tel"
          value={formData.whatsapp}
          onChange={(e) => updateFormData({ whatsapp: e.target.value })}
          placeholder="微信/WhatsApp"
          className="w-full h-12 px-4 border border-gray-300 rounded-xl"
        />
      </div>

      {/* Visa Speed Selection */}
      <div>
        <h3 className="font-medium text-gray-700 mb-3">签证办理速度</h3>
        <div className="space-y-2">
          {[
            { value: "30-min", label: "30分钟加急", time: "30 Minutes", price: 1433 },
            { value: "4-hour", label: "4小时快速", time: "4 Hours", price: 1001 },
            { value: "1-day", label: "1天标准", time: "1 Day", price: 713 },
          ].map((speed) => (
            <button
              key={speed.value}
              onClick={() => updateFormData({ visaSpeed: speed.value as "30-min" | "4-hour" | "1-day" })}
              className={`w-full p-4 rounded-xl border-2 flex justify-between items-center transition-all ${
                formData.visaSpeed === speed.value
                  ? "border-[#cc0000] bg-red-50"
                  : "border-gray-200"
              }`}
            >
              <div className="text-left">
                <div className="font-medium">{speed.label}</div>
                <div className="text-xs text-gray-500">{speed.time}</div>
              </div>
              <div className="text-[#cc0000] font-bold">¥{speed.price}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="flex justify-center gap-4 py-2">
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-8 bg-[#1677ff] rounded flex items-center justify-center">
            <span className="text-white text-sm font-bold">支</span>
          </div>
          <span className="text-xs text-gray-500">支付宝</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-8 bg-[#07c160] rounded flex items-center justify-center">
            <span className="text-white text-sm font-bold">微</span>
          </div>
          <span className="text-xs text-gray-500">微信支付</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded flex items-center justify-center">
            <span className="text-white text-[9px] font-bold">银联</span>
          </div>
          <span className="text-xs text-gray-500">银联</span>
        </div>
      </div>

      {/* Total */}
      <div className="bg-[#cc0000] text-white rounded-xl p-4 text-center">
        <div className="text-sm opacity-80">总计</div>
        <div className="text-3xl font-bold">¥{totalCNY}</div>
        {multipleEntryFee > 0 && (
          <div className="text-xs opacity-70">(含多次入境 +¥216)</div>
        )}
      </div>

      {/* Terms */}
      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          className="mt-1 w-5 h-5 rounded border-gray-300 text-[#cc0000] focus:ring-[#cc0000]"
        />
        <span className="text-sm text-gray-600">
          我已阅读并同意《服务条款》和《隐私政策》
        </span>
      </label>

      {/* Navigation */}
      <div className="flex gap-3 pb-8">
        <button
          onClick={onPrev}
          className="flex-1 h-14 border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all"
        >
          ← 上一步
        </button>
        <button
          onClick={handleSubmit}
          disabled={!termsAccepted || !formData.email || isLoading}
          className={`flex-1 h-14 text-white rounded-xl font-bold text-lg shadow-lg transition-all disabled:bg-gray-300 disabled:shadow-none ${
            termsAccepted && formData.email && !isLoading
              ? "bg-[#22c55e] hover:bg-[#16a34a]"
              : "bg-gray-300"
          }`}
        >
          {isLoading ? "处理中..." : `立即支付 ¥${totalCNY}`}
        </button>
      </div>
    </div>
  );
}
