"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import localFont from "next/font/local";
import { FcLike } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SearchBox from "../SearchBox/page";

const fonts2 = localFont({
  src: "../../../public/fonts/Montserrat-VariableFont_wght.ttf",
});
const UnsplashImages: React.FC = () => {
  const accessKey = "Jn8kBnDHwTG_--poe-IBNgpUH5fhNyh-ZhgIzmAjhDo";

  const [images, setImages] = useState<any[]>([]);
  useEffect(() => {
    const fetchImages = async () => {
      const fetchedImages = [];
      while (fetchedImages.length < 18) {
        try {
          const response: any = await axios.get(
            "https://api.unsplash.com/photos/random",
            {
              params: {
                count: 18 - fetchedImages.length,
              },
              headers: {
                Authorization: `Client-ID ${accessKey}`,
              },
            }
          );

          fetchedImages.push(...response.data);
        } catch (error) {
          console.error(error);
          break;
        }
      }

      setImages(fetchedImages);
      console.log(images);
    };

    fetchImages();
  }, []);

  // useEffect(() => {
  //   console.log("Fetched Unsplash Images:", images);
  // }, [images]);

  return (
    <div>
      {/* <div className="image-container grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-0 lg:grid-cols-3 mx-auto w-11/12 justify-around items-center py-3">
        {images.map((image: any) => (
          <div
            key={image.id}
            className="relative inset-0 flex items-center justify-evenly"
          >
            <div className="">
              <Dialog>
                <DialogTrigger asChild>
                  <Image
                    src={image.urls.small}
                    alt={image.alt_description}
                    width={1800}
                    height={1800}
                    className="w-full h-full z-30 rounded-xl"
                  />
                </DialogTrigger>

                <DialogContent className="p-2 border-2 border-red-500 overflow-auto">
                  <div className="flex flex-col pt-8 p-2 items-center justify-center overflow-auto">
                    <Image
                      src={image.urls.small}
                      alt={image.alt_description}
                      width={1800}
                      height={1800}
                      className="w-full h-full z-30 rounded-xl"
                    />
                    <div className="flex flex-col">
                      <span className="" style={fonts2.style}>
                        {image.user.name}
                      </span>
                      <span>@{image.user.username}</span>
                    </div>
                    <span>{image.user.username}</span>
                    <span>{image.user.social.instagram_username}</span>
                    <span>
                      instagram_username{image.user.social.instagram_username}
                    </span>
                    <span>
                      download{image.current_user_collections.downloads}
                    </span>
                    <span>likes:{image.likes}</span>
                  </div>
                </DialogContent>
              </Dialog>

              <div className="flex items-center justify-between p-1 bg-red-400">
                <div className="flex flex-col">
                  <div className="w-max h-max flex items-center justify-center gap-2">
                    <Image
                      src={image.user.profile_image.small}
                      alt="random"
                      width={200}
                      height={200}
                      className="rounded-full w-12 h-12 border border-slate-400 "
                    />
                    <div className="flex flex-col">
                      <span className="" style={fonts2.style}>
                        {image.user.name}
                      </span>
                      <span>@{image.user.username}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 text-2xl">
                  <FcLike />
                  <span>{image.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div> */}
      <SearchBox />
    </div>
  );
};

export default UnsplashImages;
