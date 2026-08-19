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
    return (await response.json()) as FormResponse;
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
