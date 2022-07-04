const getStyles = () => ({
  title: {
    fontSize: 50,
    padding: "10px",
    marginBottom: "50px",
  },
});

const Title = () => {
  const styles = getStyles();

  return <h1 style={styles.title}>React Apollo GraphQL</h1>;
};

export default Title;
