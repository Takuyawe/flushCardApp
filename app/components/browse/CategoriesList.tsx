import { CategoriesMap } from '~/types/word';
import { CategoryItem } from './CategoryItem';
import { useMemo } from 'react';
import { generateCategoriesList } from '~/modules/category/generateCategoriesList';

type Props = {
  categories: CategoriesMap;
};

export const CategoriesList = ({ categories }: Props) => {
  const categoriesList = useMemo(() => {
    return generateCategoriesList(categories, null);
  }, [categories]);

  return (
    <div className="flex flex-col w-72">
      {categoriesList.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};
