import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useFirestore } from "../hooks/useFirestore";
import { formValidate } from "../utilities/formValidate";

import Button from "../components/Button";
import Title from "../components/Title";
import FormInputText from "../components/FormInputText";
import FormError from "../components/FormError";

const Home = () => {
  const [copy, setCopy] = useState({});
  const { required, patternURL } = formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setError,
    setValue,
  } = useForm();

  const { data, error, loading, getData, addData, deleteData, updateData } =
    useFirestore();
  const [newOriginID, setNewOriginID] = useState();

  useEffect(() => {
    console.log("getData");
    getData();
  }, []);

  if (loading.getData) return <p>Loading data...</p>;
  if (error) return <p>{error}</p>;

  const onSubmit = async ({ url }) => {
    try {
      if (newOriginID) {
        await updateData(newOriginID, url);
        setNewOriginID("");
      } else {
        await addData(url);
      }

      resetField("url");
    } catch (error) {
      const { code, message } = firebaseErrors(error.code);
      setError(code, { message });
    }
  };

  const handleClickDelete = async (nanoid) => {
    await deleteData(nanoid);
  };

  const handleClickEdit = (item) => {
    setValue("url", item.origin);
    setNewOriginID(item.nanoid);
  };

  const handleClickCopy = async (nanoid) => {
    await navigator.clipboard.writeText(window.location.href + nanoid);
    setCopy({ [nanoid]: true });
    console.log("Copiado");
  };

  const pathURL = window.location.href;

  return (
    <>
      <Title text="Home Administrator URLs" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInputText
          type="text"
          placeholder="https://netgraphic.cl"
          {...register("url", {
            required,
            pattern: patternURL,
          })}
          label="Ingresa tu URL"
          error={errors.url}
        >
          <FormError error={errors.url} />
        </FormInputText>

        {newOriginID ? (
          <Button
            text="EDIT URL"
            type="submit"
            color="yellow"
            loading={loading.updateData}
          />
        ) : (
          <Button
            text="ADD URL"
            type="submit"
            color="blue"
            loading={loading.addData}
          />
        )}
      </form>

      {data.map((item) => (
        <div
          key={item.nanoid}
          className="bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 mb-2 p-6"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {pathURL}
            {item.nanoid}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {item.origin}
          </p>
          <div className="flex space-x-2">
            <Button
              text="Delete"
              type="button"
              color="red"
              loading={loading[item.nanoid]}
              onClick={() => handleClickDelete(item.nanoid)}
            />
            <Button
              text="Edit"
              type="button"
              color="yellow"
              onClick={() => handleClickEdit(item)}
            />
            <Button
              text={copy[item.nanoid] ? "Copied" : "Copy"}
              type="button"
              color="blue"
              onClick={() => handleClickCopy(item.nanoid)}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;
