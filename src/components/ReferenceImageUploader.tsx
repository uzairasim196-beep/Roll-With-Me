import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, Trash2, Edit3, Sparkles, CheckCircle2, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { ReferenceImage } from '../types';

interface ReferenceImageUploaderProps {
  referenceImages: ReferenceImage[];
  onAddImages: (newImages: ReferenceImage[]) => void;
  onRemoveImage: (id: string) => void;
  onUpdateCaption: (id: string, caption: string) => void;
  onProceedNext?: () => void;
  onBack?: () => void;
  onSkip?: () => void;
}

export const ReferenceImageUploader: React.FC<ReferenceImageUploaderProps> = ({
  referenceImages,
  onAddImages,
  onRemoveImage,
  onUpdateCaption,
  onProceedNext,
  onBack,
  onSkip,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const processFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploadError(null);

    const validFiles = Array.from(files).filter((file) =>
      file.type.startsWith('image/')
    );

    if (validFiles.length === 0) {
      setUploadError('Please select valid image files (JPG, PNG, WebP).');
      return;
    }

    if (referenceImages.length + validFiles.length > 8) {
      setUploadError('You can upload up to 8 reference images per order request.');
      return;
    }

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        if (!dataUrl) return;

        // Compress / resize image if needed via hidden canvas
        const img = new Image();
        img.onload = () => {
          const maxDim = 1200;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.85);

            const newImgObj: ReferenceImage = {
              id: `ref-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
              dataUrl: optimizedDataUrl,
              fileName: file.name,
              fileSize: file.size,
              caption: '',
            };

            onAddImages([newImgObj]);
          } else {
            const newImgObj: ReferenceImage = {
              id: `ref-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
              dataUrl,
              fileName: file.name,
              fileSize: file.size,
              caption: '',
            };
            onAddImages([newImgObj]);
          }
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  return (
    <div id="step-reference-photos" className="bg-[#FFFDF9] rounded-2xl border border-[#E8DFD5] p-6 sm:p-8 shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EFE7DC]">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-100/90 text-amber-900 flex items-center justify-center font-serif font-bold text-lg border border-amber-200">
            3
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2C1E18]">
                Reference Photos & Design Inspiration
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#EFE7DC] text-[#6A4B3A]">
                Optional Step
              </span>
            </div>
            <p className="text-sm text-[#7D6658] mt-0.5">
              Have an aesthetic vision for your celebration cake, color palette, or piping theme? Upload inspiration photos for our decorator team.
            </p>
          </div>
        </div>

        {referenceImages.length > 0 && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold self-start sm:self-auto">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{referenceImages.length} {referenceImages.length === 1 ? 'photo' : 'photos'} attached</span>
          </div>
        )}
      </div>

      <div className="mt-6 space-y-6">
        
        {/* Upload Dropzone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-amber-600 bg-amber-50/70 scale-[1.01]'
              : 'border-[#DFCFC0] bg-[#FAF7F2] hover:bg-[#F5EFE6] hover:border-amber-500'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => processFiles(e.target.files)}
            multiple
            accept="image/*"
            className="hidden"
            id="input-file-reference-images"
          />

          <div className="w-14 h-14 rounded-2xl bg-white border border-[#DFCFC0] text-[#A04D26] flex items-center justify-center mx-auto mb-3 shadow-xs">
            <UploadCloud className="w-7 h-7" />
          </div>

          <p className="font-serif font-bold text-base text-[#2C1E18]">
            Click to upload or drag & drop inspiration images
          </p>
          <p className="text-xs text-[#826A5C] mt-1 max-w-md mx-auto">
            Supports JPG, PNG, and WebP (Up to 8 images). Our bakers review all attached photos before sending your order confirmation.
          </p>

          <button
            type="button"
            className="mt-4 px-4 py-2 bg-white border border-[#D5C6B5] text-[#4A3225] text-xs font-semibold rounded-xl hover:bg-[#FAF6F0] shadow-2xs transition-all pointer-events-none"
          >
            Browse from Device
          </button>
        </div>

        {uploadError && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{uploadError}</span>
          </div>
        )}

        {/* Uploaded Images Gallery */}
        {referenceImages.length > 0 && (
          <div className="space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6A4B3A]">
              Attached Photos ({referenceImages.length}/8)
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {referenceImages.map((img, index) => (
                <div
                  key={img.id}
                  className="bg-[#FAF7F2] rounded-xl border border-[#E5DACD] overflow-hidden flex flex-col shadow-2xs group"
                >
                  {/* Photo preview */}
                  <div className="relative h-44 bg-stone-200 overflow-hidden">
                    <img
                      src={img.dataUrl}
                      alt={`Reference ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    <button
                      type="button"
                      id={`btn-remove-image-${img.id}`}
                      onClick={() => onRemoveImage(img.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-stone-900/70 hover:bg-red-600 text-white transition-colors cursor-pointer"
                      title="Remove image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="absolute bottom-2 left-2 bg-stone-900/75 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[10px] font-medium">
                      Photo #{index + 1}
                    </div>
                  </div>

                  {/* Caption / specific notes for this image */}
                  <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-[#7A6456]">
                        <span className="truncate max-w-[150px] font-mono text-[10px]">
                          {img.fileName}
                        </span>
                        <span>{(img.fileSize / 1024).toFixed(0)} KB</span>
                      </div>

                      <input
                        type="text"
                        placeholder="Add note for this photo (e.g. ribbon color, floral style)"
                        value={img.caption || ''}
                        onChange={(e) => onUpdateCaption(img.id, e.target.value)}
                        className="w-full bg-white border border-[#D8CABE] rounded-lg px-2.5 py-1.5 text-xs text-[#2C1E18] placeholder-[#9E8B7E] focus:outline-hidden focus:ring-1 focus:ring-amber-500 transition-all"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Inspiration Tips */}
        <div className="bg-[#FAF6F0] rounded-xl p-4 border border-[#E7DDD0] flex items-start gap-3 text-xs text-[#7A6456]">
          <Sparkles className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#4A3225]">Helpful Inspiration Ideas:</span>
            <p className="mt-0.5 leading-relaxed">
              You can upload photos of cake color schemes, piping textures, topper ideas, personalized party themes, or special gift box wrapping you’d like us to replicate.
            </p>
          </div>
        </div>

        {/* Step Navigation Controls */}
        <div className="pt-6 border-t border-[#EFE7DC] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {onBack && (
            <button
              type="button"
              id="btn-step3-back"
              onClick={onBack}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-[#D5C6B5] bg-white text-[#5A4335] text-xs sm:text-sm font-semibold hover:bg-[#FAF6F0] hover:text-[#2C1E18] transition-all shadow-xs w-full sm:w-auto cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Menu Selection</span>
            </button>
          )}

          <div className="flex items-center gap-2 sm:gap-3 flex-col sm:flex-row ml-auto w-full sm:w-auto">
            {onSkip && (
              <button
                type="button"
                id="btn-step3-skip"
                onClick={onSkip}
                className="text-xs font-semibold text-[#7D6658] hover:text-[#2C1E18] px-3 py-2 underline underline-offset-4 cursor-pointer"
              >
                Skip Photo Upload
              </button>
            )}

            {onProceedNext && (
              <button
                type="button"
                id="btn-step3-next"
                onClick={onProceedNext}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#A04D26] text-white hover:bg-[#8A3F1D] text-xs sm:text-sm font-bold shadow-sm transition-all active:scale-[0.98] w-full sm:w-auto cursor-pointer"
              >
                <span>Continue to Order Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
