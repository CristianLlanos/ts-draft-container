import Container from '../src/index'

test('resolves a dependency', () => {
    const container = new Container()
    const dependency = new SimpleDependency()
    container.register(SimpleDependency.name, function () {
        return dependency
    })
    const resolved = container.resolve(SimpleDependency.name)
    expect(resolved).toBe(dependency);
});

class SimpleDependency {}