import { useState, useEffect, useRef } from 'react';
import { FaAngleDown } from 'react-icons/fa';

interface DownloadButtonProps {
  imageUrl: string;
  sizes: { label: string; subLabel: string; url: string }[];
  label: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ imageUrl, sizes, label }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleDownloadClick = () => {
    if (downloadRef.current) {
      downloadRef.current.click();
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex" aria-label={label} ref={dropdownRef}>
      <button
        className="border border-solid border-gray-300 hover:border-gray-500 shadow px-2 py-1 text-gray-600 rounded-lg rounded-tr-none rounded-br-none"
        onClick={handleDownloadClick}
      >
        Download
      </button>
      <a
        ref={downloadRef}
        href={imageUrl}
        download
        style={{ display: 'none' }}
      />
      <button
        className="border border-solid border-gray-300 hover:border-gray-500 shadow px-2 py-1 text-gray-600 rounded-lg rounded-tl-none rounded-bl-none"
        onClick={toggleDropdown}
      >
        <FaAngleDown className="size-4" />
      </button>
      {isDropdownOpen && (
        <div className="absolute top-full right-0 py-2 mt-1 w-[200px] bg-white border border-gray-200 rounded-md shadow-md z-10 text-sm">
          {sizes.map((size) => (
            <a
              key={size.label}
              href={size.url}
              download
              className="flex px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsDropdownOpen(false)}
            >
              <p className="font-semibold mr-2">{size.label}</p>
              <p className="font-thin">{size.subLabel}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default DownloadButton;
