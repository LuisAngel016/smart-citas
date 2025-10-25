import { authContainer } from "@/auth/IoC/auth.container";
import { clientContainer } from "@/clients/IoC/client.container";
import { serviceContainer } from "@/services/IoC/service.container";

const dependencies = {
  ...authContainer,
  ...clientContainer,
  ...serviceContainer,
};

type DependencyMap = typeof dependencies;
type DependencyKey = keyof DependencyMap;

export const container = {
  resolve<K extends DependencyKey>(name: K): DependencyMap[K] {
    const dep = dependencies[name];
    if (!dep) throw new Error(`Dependency ${String(name)} not found`);
    return dep;
  },
};
