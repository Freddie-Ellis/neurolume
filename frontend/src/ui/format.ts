/** Small text formatting helpers shared by labels, tooltip and inspector. */

export function formatCount(value: number): string {
  return value.toLocaleString("en-GB");
}

/** Compact parameter counts such as 401.9K or 1.2M. */
export function formatParams(value: number): string {
  if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
  if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
  return String(value);
}

export function formatShape(shape: number[]): string {
  return shape.join(" × ");
}

const ACTIVATION_NAMES: Record<string, string> = {
  relu: "ReLU",
  relu6: "ReLU6",
  leaky_relu: "Leaky ReLU",
  elu: "ELU",
  gelu: "GELU",
  silu: "SiLU",
  mish: "Mish",
  sigmoid: "Sigmoid",
  tanh: "Tanh",
  softplus: "Softplus",
  softmax: "Softmax",
  log_softmax: "LogSoftmax",
  clamp: "Clamp",
};

export function formatActivation(activation: string | null): string {
  if (!activation) return "";
  return ACTIVATION_NAMES[activation] ?? activation;
}

const FRAMEWORK_NAMES: Record<string, string> = { pytorch: "PyTorch", keras: "Keras", demo: "Demo" };

export function formatFramework(framework: string): string {
  return FRAMEWORK_NAMES[framework] ?? framework;
}
