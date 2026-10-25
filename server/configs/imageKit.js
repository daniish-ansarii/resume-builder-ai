import ImageKit from "@imagekit/nodejs";

const hasImageKitConfig = process.env.IMAGEKIT_PUBLIC_KEY && process.env.IMAGEKIT_PRIVATE_KEY && process.env.IMAGEKIT_URL;
const imagekit = hasImageKitConfig ? new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
}) : null;

export default imagekit;
