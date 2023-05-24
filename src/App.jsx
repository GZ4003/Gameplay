import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useState } from "react";
import User from "./User";

function App() {
  const [people, setPeople] = useState([
    { id: 10, name: "ten" },
    { id: 1, name: "one" },
    { id: 3, name: "three" },
    { id: 8, name: "eight" },
    { id: 4, name: "four" },
    { id: 5, name: "five" },
    { id: 9, name: "nine" },
    { id: 6, name: "six" },
    { id: 7, name: "seven" },
    { id: 2, name: "two" },
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    console.log("active", active.id);
    console.log("over", over.id);

    if (!active.id !== over.id) {
      setPeople((people) => {
        const oldIndex = people.findIndex((person) => person.id === active.id);
        const newIndex = people.findIndex((person) => person.id === over.id);

        console.log(arrayMove(people, oldIndex, newIndex));
        return arrayMove(people, oldIndex, newIndex);
      });
    }

    console.log("drag end");
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-4/6">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <h1 className="text-2xl font-bold">Sort the numbers from lowest to highest</h1>
          <SortableContext
            items={people}
            strategy={verticalListSortingStrategy}
          >
            {people.map((user) => (
              <User key={user.id} user={user} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

export default App;