import { ChangeEvent, useEffect, useState } from "react";
import { store } from "../../store/store";
import styles from "./ProfilePage.module.sass";
import { useNavigateToLogin } from "../../hooks/hooks";
import { Image, ImageCreate } from "../../models/models";
import { observer } from "mobx-react-lite";

export const ProfilePage = observer(() => {
  const { createImage } = store.imageStore;
  const { currentUserId } = store.authStore;

  useNavigateToLogin("/profile");

  const returnFileSize = (number: number | undefined) => {
    if (number === undefined) return null;
    if (number < 1024) {
      return `${number} bytes`;
    } else if (number >= 1024 && number < 1048576) {
      return `${(number / 1024).toFixed(1)} KB`;
    } else if (number >= 1048576) {
      return `${(number / 1048576).toFixed(1)} MB`;
    }
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;

    const file = event.target.files[0];
    const maxAllowedSize = 31457280;

    const regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
    // const fileReader = new FileReader();
    // fileReader.readAsDataURL(file);
    // fileReader.onload = async function handleLoad() {
    //   const [title, extension] = splitLastOccurrence(file.name, ".");
    //   const image: Image = {
    //     id: 0,
    //     title: title!,
    //     content: fileReader.result as string,
    //     extension: extension!,
    //     userId: currentUserId,
    //   };
    //   await createImage(image);
    //   console.log(currentUserId)
    // };
   
    if (!regex.test(file.name)) return;

    if (file.size > maxAllowedSize) {
      alert("File is too big!");
      return;
    }

    const [title, extension] = splitLastOccurrence(file.name, ".");
    const image: ImageCreate = {
      title: title!,
      content:  URL.createObjectURL(file),
      extension: extension!,
      userId: currentUserId,
    };
    await createImage(image);
  };

  function splitLastOccurrence(str: string, substring: string) {
    const arr = str.split(substring);

    const after = arr.pop();

    const before = arr.join(substring);

    return [before, after];
  }
  return (
    <div>
      <label>Добавить картинку</label>
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={onChangeFile}
      ></input>
    </div>
  );
})
