"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import { useState } from "react";
import APIs from "@/services/API";
import toast, { Toaster } from 'react-hot-toast';

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
  full_name: z.string().min(1, { message: "First name is required!" }),
  full_surname: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  gender: z.enum(["male", "female"], { message: "Sex is required!" }),
  profile_photo: z.string().refine((img) => {
    // Verifica si la cadena tiene el formato base64 y el prefijo correcto
    const base64Regex = /^data:image\/[a-zA-Z]+;base64,/;
    return base64Regex.test(img);
  }, {
    message: "Valid base64 image is required",
  }),
});

type Inputs = z.infer<typeof schema>;

const TeacherForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const [imagePreview, setImagePreview] = useState<string | null>(data?.img || null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        // Set the image in the form data directly
        setValue('profile_photo', base64String); // update the form value directly
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  
    try {
      if (type === "create") {
        try {
          await APIs.createUser(data);
          toast.success('Usuario credo exitosamente')
        } catch (error) {
          toast.error("Hubo un error al crear el usuario")
        }
   
      } else {
        // await APIs.updateUser(data);
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <h1 className="text-xl font-semibold">Crear un nuevo usuario</h1>
      <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Usuario"
          name="username"
          defaultValue={data?.username}
          register={register}
          error={errors.username}
        />
        <InputField
          label="Correo electrónico"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors.email}
        />
        <InputField
          label="Contraseña"
          name="password"
          type="password"
          defaultValue={data?.password}
          register={register}
          error={errors.password}
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">
        Personal Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Nombre completo"
          name="full_name"
          defaultValue={data?.full_name}
          register={register}
          error={errors.full_name}
        />
        <InputField
          label="Apellido completo"
          name="full_surname"
          defaultValue={data?.full_surname}
          register={register}
          error={errors.full_surname}
        />
        <InputField
          label="Teléfono"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
        <InputField
          label="Dirección"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
      
        {/* <InputField
          label="Birthday"
          name="birthday"
          defaultValue={data?.birthday}
          register={register}
          error={errors.birthday}
          type="date"
        /> */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Sex</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("gender")}
            defaultValue={data?.gender}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender?.message && (
            <p className="text-xs text-red-400">
              {errors.gender.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer" htmlFor="img">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Image preview"
                className="mt-4"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            )}
            <span>Upload a photo</span>
          </label>
          <input
            type="file"
            id="img"
            {...register("profile_photo")}
            className="hidden"
            onChange={handleImageChange}
          />
          {errors.profile_photo?.message && (
            <p className="text-xs text-red-400">
              {errors.profile_photo.message.toString()}
            </p>
          )}
        </div>
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default TeacherForm;
