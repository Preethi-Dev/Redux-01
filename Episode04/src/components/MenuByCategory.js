import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const MenuByCategory = (props) => {
  const { category, index, veg } = props;
  const { title, itemCards } = category?.card?.card;
  const [vegOrNonVeg, setVegOrNonVeg] = useState(itemCards);
  const vegItemCards = itemCards.filter(
    (itemCard) => itemCard?.card?.info?.isVeg === 1
  );
  useEffect(() => {
    veg ? setVegOrNonVeg(vegItemCards) : setVegOrNonVeg(itemCards);
  }, []);
  return (
    <div className="menu">
      <div className="menu__header">
        <h3 className="menu__title">
          {title} ({vegOrNonVeg.length})
        </h3>
        <h3
          className="menu__reveal"
          onClick={(e) => {
            e.target.innerText === "+"
              ? (e.target.innerText = "-")
              : (e.target.innerText = "+");

            Array.from(e.target.parentElement.parentElement.children)
              .at(-1)
              .classList.toggle("hidden");
          }}
        >
          {index === 0 ? "-" : "+"}
        </h3>
      </div>
      <div className={`menu__body ${index === 0 ? "" : "hidden"}`}>
        <ul>
          {vegOrNonVeg.map((itemCard) => {
            const { name, price } = itemCard.card.info;
            return (
              <li key={uuidv4()}>
                {name} - Rs. {price / 100}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MenuByCategory;