export type FormLifecycle = 'idle' | 'submitting' | 'success' | 'error';

export interface FormResponse {
  status?: boolean;
  message?: string;
}

interface LifecycleRef {
  value: FormLifecycle;
}

interface SubmissionOptions {
  validate: () => boolean;
  request: () => Promise<Response>;
}

export interface SubmissionResult {
  data: FormResponse | null;
  error: unknown;
  submitted: boolean;
}

async function readResponse(response: Response): Promise<FormResponse | null> {
  try {
    const value: unknown = await response.json();
    if (!(value instanceof Object) || Array.isArray(value)) return null;
    const status = 'status' in value && value.status === true;
    const message = 'message' in value && value.message === String(value.message) ? String(value.message) : undefined;
    const data: FormResponse = { status };
    if (message !== undefined) data.message = message;
    return data;
  } catch {
    return null;
  }
}

export async function runFormSubmission(lifecycle: LifecycleRef, options: SubmissionOptions): Promise<SubmissionResult> {
  if (lifecycle.value === 'submitting') {
    return { data: null, error: null, submitted: false };
  }

  if (!options.validate()) {
    lifecycle.value = 'error';
    return { data: null, error: null, submitted: false };
  }

  lifecycle.value = 'submitting';

  try {
    const response = await options.request();
    const data = await readResponse(response);
    lifecycle.value = response.ok && data?.status === true ? 'success' : 'error';
    return { data, error: null, submitted: true };
  } catch (error) {
    lifecycle.value = 'error';
    return { data: null, error, submitted: true };
  }
}
