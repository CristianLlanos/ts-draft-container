import Container from '../src/index'

it('resolves a simple dependency', () => {
    const dependency = new SimpleDependency();
    const container = new Container();
    container.singleton(SimpleDependency, (container: Container) => {
        return dependency;
    });
    const resolved = container.resolve(SimpleDependency);
    resolved.greet();
    expect(resolved).toBe(dependency);
});

it('cannot resolve a simple dependency', () => {
    const container = new Container();
    try {
        container.resolve(AnotherSimpleDependency);
    } catch (error) {
        expect(error.message).toContain(AnotherSimpleDependency.name);
    }
});

it('resolves a singleton dependency', () => {
    const container = new Container();
    container.singleton(SimpleDependency, () => {
        return new SimpleDependency();
    });
    const firstResolved = container.resolve(SimpleDependency);
    const secondResolved = container.resolve(SimpleDependency);
    expect(firstResolved).toBe(secondResolved);
});

it('resolves a factory dependency', () => {
    const container = new Container();
    container.factory(SimpleDependency, () => {
        return new SimpleDependency();
    });
    const firstResolved = container.resolve(SimpleDependency);
    const secondResolved = container.resolve(SimpleDependency);
    expect(firstResolved).toBeInstanceOf(SimpleDependency);
    expect(secondResolved).toBeInstanceOf(SimpleDependency);
    expect(firstResolved).not.toBe(secondResolved);
});

class SimpleDependency {
    greet() {
        return "I'm a simple dependency"
    }
}

class AnotherSimpleDependency {
    greet() {
        return "I'm another simple dependency"
    }
}