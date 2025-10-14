import { Star, StarHalf, StarOff } from "lucide-react";

export const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating); // full stars
    const halfStar = rating - fullStars >= 0.5; // half star?
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <ul className="list-star flex">
            {[...Array(fullStars)].map((_, i) => (
                <li key={"full" + i}>
                    <Star className="text-third" fill={'orange'} size={16} />
                </li>
            ))}

            {halfStar && (
                <li key="half">
                    <StarHalf className="text-third" fill={'orange'} size={16} />
                </li>
            )}

            {[...Array(emptyStars)].map((_, i) => (
                <li key={"empty" + i}>
                    <StarOff className="text-cl-3" size={16} />
                </li>
            ))}
        </ul>
    );
};
