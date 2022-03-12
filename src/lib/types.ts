export type AuthFunctionType = () => Promise<void>;

export interface LinkType {
  name: string;
  href: string;
  rel?: string;
}