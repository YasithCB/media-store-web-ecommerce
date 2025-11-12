import { useContextElement } from "@/context/Context";

export default function WishlistLength() {
  const { wishList } = useContextElement();

    console.log(wishList)
  return <>{wishList?.length || 0}</>;
}
