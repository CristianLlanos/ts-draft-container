export interface Container {
    resolve(dependency: string): any
    register(dependency: string, abstraction: () => any): Container
}

export class Dependencies implements Container {
    definitions: Map<any, any>
    constructor() {
        this.definitions = new Map()
    }
    register(dependency: string, abstraction: () => any): Container {
        this.definitions.set(dependency, abstraction)
        return this
    }
    resolve(dependency: string) {
        if (!this.definitions.has(dependency)) {
            throw new Error(`Unable to resolve dependency [${dependency}]`)
        }
        const abstraction = this.definitions.get(dependency)
        return new abstraction()
    }
}

export default Dependencies