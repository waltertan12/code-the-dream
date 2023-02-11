const PureHello = ({ helloTo }) => {
  return <h3>Hello, {helloTo}!</h3>;
};

const expectedName = "Walter";
let externalName = expectedName;
const ImpureHello = ({ helloTo }) => {
  // FIXME: Mutating an existing variable 😱
  externalName = helloTo;
  return <h3>Hello, {externalName}!</h3>;
};

const names = ["Fiona", "Shrek", "Donkey"];

const Purity = () => {
  return (
    <>
      <div>
        <h2>External Name: {externalName}</h2>
        <p>
          {externalName === expectedName
            ? `External name is ${expectedName}! ✅`
            : `External name is not ${expectedName} 😭`}
        </p>
      </div>
      <div>
        <h2>Impure Hello</h2>
        {names.map((name) => (
          <ImpureHello helloTo={name} key={name} />
        ))}
      </div>
      <div>
        <h2>Pure Hello</h2>
        {names.map((name) => (
          <PureHello helloTo={name} key={name} />
        ))}
      </div>
    </>
  );
};

export default Purity;
