const DivComponent = () => {
  return (
    <div>
      <li>Item A</li>
      <li>Item B</li>
    </div>
  );
};

const FragmentComponent = () => {
  return (
    <>
      <li>Item A</li>
      <li>Item B</li>
    </>
  );
};

const ArrayComponent = () => {
  return [<li key="item-a">Item A</li>, <li key="item-b">Item B</li>];
};

const FragmentDemo = () => {
  return (
    <div>
      <div>
        <h2>Div Component</h2>
        <ul>
          <DivComponent />
        </ul>
      </div>
      <div>
        <h2>Fragment Component</h2>
        <ul>
          <FragmentComponent />
        </ul>
      </div>
      <div>
        <h2>Array Component</h2>
        <ul>
          <ArrayComponent />
        </ul>
      </div>
    </div>
  );
};

export default FragmentDemo;
