import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  Download,
  Heart,
  Instagram,
  MapPin,
  Twitter,
  MapPinOff,
} from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const SearchBox: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [filteredImages, setFilteredImages] = useState<any[]>([]);
  const [openImageIndices, setOpenImageIndices] = useState<boolean[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeSuggestion, setActiveSuggestion] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
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

  useEffect(() => {
    console.log("Fetched Unsplash Images:", images);
  }, [images]);

  const handleSearch = (query: string) => {
    const filteredArr = images.filter((image) => {
      return image.alt_description.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredImages(filteredArr);
  };

  const handleImageClick = (index: number) => {
    const newOpenImageIndices = [...openImageIndices];
    newOpenImageIndices[index] = !openImageIndices[index];
    setOpenImageIndices(newOpenImageIndices);
  };

  return (
    <div className="flex flex-col gap-20">
      <Input
        type="text"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        placeholder="Search..."
        className="text-neutral-950 border  border-neutral-950 w-[200px] lg:w-[400px] mx-auto"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 sm:mt-16 w-full justify-items-center sm:justify-around gap-y-10 gap-x-10">
        {(filteredImages.length > 0 ? filteredImages : images).map(
          (image, index) => (
            <div
              key={image.id}
              className="w-full sm:w-[300px] lg:w-[400px] 2xl:w-[450px]"
            >
              <div className="overflow-hidden bg-neutral-950 relative rounded-2xl hover:rounded-none transition-all duration-500 ease-in">
                <AspectRatio ratio={4 / 3}>
                  <Image
                    src={image.urls.small}
                    width={800}
                    height={400}
                    alt={image.description}
                    className="w-full h-full object-cover mx-auto transition-all duration-500 ease-in hover:scale-110 hover:opacity-60 "
                    onClick={() => handleImageClick(index)}
                  />
                </AspectRatio>
              </div>

              <div className="flex justify-between w-11/12 mx-auto py-3">
                <div className="flex flex-col">
                  <span className="text-lg">{image.user.name}</span>
                  <span className="italic text-neutral-400">
                    @{image.user.username}
                  </span>
                </div>
                <div className="flex space-x-2 text-lg items-center">
                  <Heart color="red" className="pr-2" />
                  {image.likes}
                </div>
              </div>
              <Dialog
                open={openImageIndices[index]}
                onOpenChange={() => handleImageClick(index)}
              >
                <DialogContent className="w-auto mx-auto ">
                  <div className="mx-auto sm:w-[300px] lg:w-[400px] 2xl:w-[450px] flex flex-col sm:flex-row gap-3  justify-between relative inset-0">
                    <AspectRatio ratio={4 / 3}>
                      <Image
                        src={image.urls.small}
                        width={800}
                        height={400}
                        alt={image.description}
                        className="w-full h-full rounded-xl object-cover mx-auto"
                      />
                    </AspectRatio>

                    <div className="flex flex-col justify-evenly gap-y-4 text-neutral-50">
                      {/* profile */}
                      <div className="flex flex-col gap-y-1">
                        <div className="flex gap-2 items-center">
                          <Avatar>
                            <AvatarImage
                              src={image.user.profile_image.small}
                              alt={image.user.first_name}
                            />
                          </Avatar>
                          <div className="flex flex-col">
                            <h3 className="text-lg font-semibold whitespace-nowrap">
                              {image.user.first_name}
                            </h3>
                            <h5 className="opacity-60 ">
                              @{image.user.username}
                            </h5>
                          </div>
                        </div>

                        {/* social */}
                        <div className="flex flex-col justify-center gap-y-1 scale-75">
                          {image.user.social.instagram_username ? (
                            <span className="flex gap-2 items-center ">
                              <Instagram color="red" />@
                              {image.user.social.instagram_username}
                            </span>
                          ) : (
                            <span className="flex gap-2 items-center opacity-60">
                              <Instagram color="gray" />
                              <span className="text-xl">not provided</span>
                            </span>
                          )}
                          {image.user.social.twitter_username ? (
                            <span className="flex gap-2 items-center ">
                              <Twitter color="blue" />@
                              {image.user.social.twitter_username}
                            </span>
                          ) : (
                            <span className="flex gap-2 items-center opacity-60">
                              <Twitter color="gray" />
                              <span className="text-xl">not provided</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* desc */}

                      <div className="flex flex-col ">
                        <span className="opacity-70 italic text-lg">
                          {image.alt_description}
                        </span>
                      </div>
                      {image.location.name ? (
                        <div className="flex gap-2 items-center">
                          <MapPin
                            className="animate-bounce w-6 h-6 text-pink-500"
                            // color="rose"
                          />
                          <span>{image.location.name}</span>
                        </div>
                      ) : (
                        <>
                          <MapPinOff className=" w-6 h-6 opacity-60" />
                        </>
                      )}
                    </div>
                  </div>
                  <div className="w-full flex justify-around items-center py-2 text-neutral-50">
                    <Button className="bg-rose-600/90 flex gap-2 items-center cursor-not-allowed scale-90 sm:scale-100">
                      <Heart />
                      <span className="text-lg ">{image.likes}</span>
                    </Button>
                    <Button className="bg-neutral-600 flex gap-2 items-center cursor-not-allowed scale-90 sm:scale-100 ">
                      <Download />
                      <span className="text-lg ">{image.downloads}</span>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SearchBox;
