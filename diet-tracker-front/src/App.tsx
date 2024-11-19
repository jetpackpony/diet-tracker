import PocketBase from "pocketbase";
import styles from "./App.module.css";
import { useEffect, useState } from "react";

let pb: PocketBase;
function getPB() {
  if (!pb) {
    pb = new PocketBase("http://127.0.0.1:8090");
  }
  return pb;
}

function useFoodItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getPB()
      .collection("foodItems")
      .getFullList()
      .then((items) => setItems(items));
  }, []);

  useEffect(() => {
    getPB()
      .collection("foodItems")
      .subscribe("*", (e) => {
        setItems([...items, e.record]);
      });
    return () => getPB().collection("foodItems").unsubscribe("*");
  }, [items]);

  return items;
}

async function createFoodItem(title: string) {
  return await getPB().collection("foodItems").create({ title });
}

export default function App() {
  const items = useFoodItems();
  return (
    <div>
      <div>
        {items.map(({ title }) => (
          <div key={title}>{title}</div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const title = new FormData(e.target as HTMLFormElement).get("title");
          if (title) {
            createFoodItem(title.toString());
          }
        }}
      >
        <input name="title" type="text" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
