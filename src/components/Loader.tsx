/** Nine cells lighting up in turn, as in the old loader. */
export default function Loader({ label = 'Loading' }: { label?: string }) {
  return (
    <div role='status' className='flex flex-col items-center gap-4 py-10'>
      <div aria-hidden className='grid grid-cols-3 gap-1.5 rounded-md bg-well p-2'>
        {Array.from({ length: 9 }, (_, i) => (
          <span
            key={i}
            className='size-5 rounded-[6px] bg-glass-raised motion-safe:animate-[loader_1.35s_ease-in-out_infinite]'
            style={{ animationDelay: `${((i * 4) % 9) * 150}ms` }}
          />
        ))}
      </div>
      <span className='label'>{label}</span>
    </div>
  );
}
