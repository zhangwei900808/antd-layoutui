const CountContext = React.createContext({
  count: 0
});

const withCount = Component => props => {
  <Consumer>{value => <Component {...props} count={value.count} />}</Consumer>;
};
