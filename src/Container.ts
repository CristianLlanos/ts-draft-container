export interface Container {
    factory<T>(dependency: new () => T, abstraction: (container: Container) => T): Container
    singleton<T>(dependency: new () => T, abstraction: (container: Container) => T): Container
    resolve<T>(dependency: new () => T): T
}

export class Dependencies implements Container {
    definitions: Map<any, any>
    singletons: Map<any, any>;
    constructor() {
        this.definitions = new Map();
        this.singletons = new Map();
    }
    singleton<T>(dependency: new () => T, abstraction: (container: Container) => T): Container {
        console.log(dependency);
        this.factory(dependency, (container: Container) => {
            if (!this.singletons.has(dependency)) {
                this.singletons.set(dependency, abstraction(container));
            }
            return this.singletons.get(dependency);
        });
        return this;
    }
    factory<T>(dependency: new () => T, abstraction: (container: Container) => T): Container {
        this.definitions.set(dependency, abstraction);
        return this;
    }
    resolve<T>(dependency: new () => T ): T {
        if (!this.definitions.has(dependency)) {
            throw new Error(`Unable to resolve dependency [${dependency.name}]`);
        }
        const abstraction = this.definitions.get(dependency);
        return abstraction(this);
    }
}

export default Dependencies