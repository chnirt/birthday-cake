export const Cake = ({ candleVisible }: { candleVisible: boolean }) => {
  return (
    <div className="cake">
      <div className="plate"></div>
      <div className="layer layer-bottom"></div>
      <div className="layer layer-middle"></div>
      <div className="layer layer-top"></div>
      <div className="icing"></div>
      <div className="drip drip1"></div>
      <div className="drip drip2"></div>
      <div className="drip drip3"></div>
      <div id="candle" className="candle">
        {candleVisible ? <div className="flame"></div> : null}
      </div>
    </div>
  );
};
