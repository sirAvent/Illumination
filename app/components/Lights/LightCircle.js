export default function Light({ hexColor }) {
  return (
    <div className="h-auto w-auto basis-[35vh] aspect-square">
      <div
        className={`
          h-[100%]
          rounded-[100%]
          border-black border-4
          transition-all
          duration-[1000ms]
          ease-in
        `}
        // Using style property since Tailwind cannot generate dynamic class names
        style={{ backgroundColor: `${hexColor.toLowerCase()}` }}
      />
    </div>
  );
}
