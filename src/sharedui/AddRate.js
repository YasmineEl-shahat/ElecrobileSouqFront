function Star({ marked, starId }) {
  return (
    <span star-id={starId} style={{ color: "#fcd002" }} role="button">
      {marked ? "\u2605" : "\u2606"}
    </span>
  );
}

function AddRate({ rating, setRating }) {
  const [selection, setSelection] = React.useState(0);
  const hoverOver = (event) => {
    let val = 0;
    if (event && event.target && event.target.getAttribute("star-id"))
      val = event.target.getAttribute("star-id");
    setSelection(val);
  };
  return (
    <div
      className="starRating"
      onMouseOut={() => hoverOver(null)}
      onClick={() =>
        setRating(event.target.getAttribute("star-id") || this.state.rating)
      }
      onMouseOver={hoverOver}
    >
      {Array.from({ length: 5 }, (v, i) => (
        <Star
          starId={i + 1}
          key={`star_${i + 1} `}
          marked={selection ? selection >= i + 1 : rating >= i + 1}
        />
      ))}
    </div>
  );
}

export default AddRate;
