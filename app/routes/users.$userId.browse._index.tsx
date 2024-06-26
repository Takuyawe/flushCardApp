import { useRecoilState } from 'recoil';
import { categoriesAtom } from '~/atoms/atom';
import { CategoriesList } from '~/components/browse/CategoriesList';

export default function Index() {
  const [categories] = useRecoilState(categoriesAtom);

  return (
    <div className="flex-1 overflow-y-auto">
      <CategoriesList
        categories={categories}
        parentCategoryId={null}
        categoryId={null}
      />
    </div>
  );
}
