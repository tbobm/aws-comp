import Tooltip from './Tooltip';

interface InfoIconProps {
  content: string;
}

export default function InfoIcon({ content }: InfoIconProps) {
  return (
    <Tooltip content={content} position="top">
      <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary-100 text-primary-600 hover:bg-primary-200 transition-colors cursor-help text-xs font-bold">
        ?
      </div>
    </Tooltip>
  );
}
