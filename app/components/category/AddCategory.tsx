import { useState } from 'react';
import { CategorySelect } from './CategorySelect';

type Props = {
  closeModal: () => void;
};

export const AddCategory = ({ closeModal }: Props) => {
  const [newCategory, setNewCategory] = useState<string>('');

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-60 h-80 w-5/6 bg-white shadow-lg rounded-lg animate-fade-in">
      <div className="flex flex-col h-full items-center justify-between py-5">
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1">
            <label className="text-md" htmlFor="definition">
              Category Name
            </label>
            <input
              name="newCategory"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Write a new category"
              className="h-10 w-72 border-2 border-base-dark rounded-md pl-2 text-lg"
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-md" htmlFor="category">
              Parent Category
            </label>
            <div className="flex h-10 w-72">
              <CategorySelect />
            </div>
          </div>
        </div>
        <div className="flex justify-end w-full gap-x-3 mr-14">
          <button className="h-6 w-20 bg-white text-base-dark outline outline-base-dark rounded-xl text-md">
            Cancel
          </button>
          <button className="h-6 w-20 bg-base-dark text-white rounded-xl text-md">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};