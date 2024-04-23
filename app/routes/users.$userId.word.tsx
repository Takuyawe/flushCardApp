import { ActionFunctionArgs, json } from '@remix-run/node';
import { useState } from 'react';
import { AIGenerationButton } from '~/components/newWord/AIGenerationButton';
import { CategorySelectContainer } from '~/components/newWord/CategorySelectContainer';
import { DefinitionInput } from '~/components/newWord/DefinitionInput';
import { EgSentenceInput } from '~/components/newWord/EgSentenceInput';
import { SaveButton } from '~/components/newWord/SaveButton';
import { WordInput } from '~/components/newWord/WordInput';
import { convertToRomaji } from '~/modules/word/convertToRomaji';
import { addNewWord } from '~/modules/prisma';
import { useRecoilState } from 'recoil';
import { categoriesAtom, userAtom } from '~/atoms/atom';
import { getKanaAndPardWithYahoo } from '~/modules/word/getKanaAndPartWithYahoo';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const word = formData.get('word');
  const definition = formData.get('definition');
  const sentence = formData.get('sentence');
  const sentenceKana = formData.get('sentenceKana');
  const sentenceRomaji = formData.get('sentenceRomaji');
  const sentenceTranslation = formData.get('sentenceTranslation');
  const userId = formData.get('userId');
  const categoryId = formData.get('categoryId');

  const { kana, part } = await getKanaAndPardWithYahoo(word as string);
  const romajiWord = convertToRomaji(kana);
  const now = new Date();

  const response = addNewWord(
    word as string,
    definition as string,
    userId as string,
    categoryId as string,
    kana,
    romajiWord,
    part,
    sentence as string,
    now,
    sentenceKana as string,
    sentenceRomaji as string,
    sentenceTranslation as string
  );

  return json({ response });
};

export default function Index() {
  const [word, setWord] = useState<string>('');
  const [definition, setDefinition] = useState<string>('');
  const [sentence, setSentence] = useState<string>('');
  const [sentenceKana, setSentenceKana] = useState<string>('');
  const [sentenceRomaji, setSentenceRomaji] = useState<string>('');
  const [sentenceTranslation, setSentenceTranslation] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [chosenCategoryId, setChosenCategoryId] = useState<string>('');
  const [user] = useRecoilState(userAtom);
  const [categories] = useRecoilState(categoriesAtom);

  return (
    <div className="h-body flex flex-col items-center justify-center gap-y-4">
      <CategorySelectContainer
        category={category}
        setCategory={setCategory}
        categories={categories}
        setChosenCategoryId={setChosenCategoryId}
      />
      <WordInput word={word} setWord={setWord} />
      <AIGenerationButton
        word={word}
        setDefinition={setDefinition}
        setSentence={setSentence}
        setSentenceKana={setSentenceKana}
        setSentenceRomaji={setSentenceRomaji}
        setSentenceTranslation={setSentenceTranslation}
      />
      <DefinitionInput definition={definition} setDefinition={setDefinition} />
      <EgSentenceInput
        sentence={sentence}
        setSentence={setSentence}
        sentenceKana={sentenceKana}
        setSentenceKana={setSentenceKana}
        sentenceRomaji={sentenceRomaji}
        setSentenceRomaji={setSentenceRomaji}
        sentenceTranslation={sentenceTranslation}
        setSentenceTranslation={setSentenceTranslation}
      />
      <SaveButton
        word={word}
        definition={definition}
        sentence={sentence}
        sentenceKana={sentenceKana}
        sentenceRomaji={sentenceRomaji}
        sentenceTranslation={sentenceTranslation}
        userId={user?.id as string}
        categoryId={chosenCategoryId}
      />
    </div>
  );
}
