import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { categoriesAtom } from '~/atoms/atom';
import { CategoriesList } from '~/components/browse/CategoriesList';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const categoryId = url.searchParams.get('categoryId');

  return json({ categoryId });
};

export default function Index() {
  const { categoryId } = useLoaderData<typeof loader>();
  const [categories] = useRecoilState(categoriesAtom);

  const parentCategoryId = useMemo(() => {
    if (!categoryId) return;
    return categories.get(categoryId)?.parentCategoryId;
  }, [categories, categoryId]);

  return (
    <div className="flex-1 overflow-y-auto">
      <CategoriesList
        categories={categories}
        parentCategoryId={parentCategoryId as string}
        categoryId={categoryId}
      />
    </div>
  );
}
