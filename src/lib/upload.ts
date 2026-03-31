export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic'] as const;
export const ACCEPTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.heic'] as const;
export const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024; // 20MB
export const MAX_FILE_COUNT = 50;

export type AcceptedImageType = (typeof ACCEPTED_IMAGE_TYPES)[number];

// ─── Validation ───────────────────────────────────────────────────────────────

export type FileValidationResult =
  | { valid: true }
  | { valid: false; error: string };

export function validateFile(file: File): FileValidationResult {
  const type = file.type.toLowerCase() as AcceptedImageType;
  const isAcceptedType = ACCEPTED_IMAGE_TYPES.includes(type);

  // HEIC files sometimes come through with an empty MIME type — fall back to extension check
  const ext = `.${file.name.split('.').pop()?.toLowerCase()}` as (typeof ACCEPTED_EXTENSIONS)[number];
  const isAcceptedExt = ACCEPTED_EXTENSIONS.includes(ext);

  if (!isAcceptedType && !isAcceptedExt) {
    return {
      valid: false,
      error: `"${file.name}" is not a supported format. Accepted: JPG, PNG, WebP, HEIC.`,
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `"${file.name}" is ${sizeMB}MB — maximum allowed is 20MB.`,
    };
  }

  return { valid: true };
}

export function validateFileList(files: File[]): { valid: File[]; errors: string[] } {
  if (files.length > MAX_FILE_COUNT) {
    return {
      valid: [],
      errors: [`Maximum ${MAX_FILE_COUNT} files allowed. You selected ${files.length}.`],
    };
  }

  const valid: File[] = [];
  const errors: string[] = [];

  for (const file of files) {
    const result = validateFile(file);
    if (result.valid) {
      valid.push(file);
    } else {
      errors.push(result.error);
    }
  }

  return { valid, errors };
}

// ─── Single upload ────────────────────────────────────────────────────────────

export type UploadedFile = {
  url: string;
  fileName: string;
  fileSize: number;
};

export type UploadError = {
  fileName: string;
  error: string;
};

export async function uploadFile(file: File): Promise<UploadedFile> {
  const validation = validateFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body?.error ?? `Upload failed (${response.status})`);
  }

  const data = await response.json();
  return {
    url: data.url as string,
    fileName: file.name,
    fileSize: file.size,
  };
}

// ─── Batch upload with progress ───────────────────────────────────────────────

export type BatchUploadProgress = {
  completed: number;
  total: number;
  percent: number;
  currentFile: string;
};

export type BatchUploadCallbacks = {
  onProgress?: (progress: BatchUploadProgress) => void;
  onFileSuccess?: (file: UploadedFile, index: number) => void;
  onFileError?: (error: UploadError, index: number) => void;
};

export type BatchUploadResult = {
  succeeded: UploadedFile[];
  failed: UploadError[];
};

export async function uploadMultipleFiles(
  files: File[],
  callbacks: BatchUploadCallbacks = {},
): Promise<BatchUploadResult> {
  const { onProgress, onFileSuccess, onFileError } = callbacks;
  const succeeded: UploadedFile[] = [];
  const failed: UploadError[] = [];
  const total = files.length;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    onProgress?.({
      completed: i,
      total,
      percent: Math.round((i / total) * 100),
      currentFile: file.name,
    });

    try {
      const result = await uploadFile(file);
      succeeded.push(result);
      onFileSuccess?.(result, i);
    } catch (err) {
      const error: UploadError = {
        fileName: file.name,
        error: err instanceof Error ? err.message : 'Unknown upload error',
      };
      failed.push(error);
      onFileError?.(error, i);
    }
  }

  onProgress?.({
    completed: total,
    total,
    percent: 100,
    currentFile: '',
  });

  return { succeeded, failed };
}
