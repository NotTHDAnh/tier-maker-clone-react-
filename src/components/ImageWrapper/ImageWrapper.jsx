import { useSortable } from "@dnd-kit/react/sortable";

export default function ImageWrapper({ image }) {
    const { ref } = useSortable({ id: image.id, data: image, plugins: () => [] })

    return (
        <div ref={ref} className="w-max h-max">
            <img className="object-cover w-25 h-25 rounded-md" src={image.url} alt={image.name} />
        </div>
    );
}
