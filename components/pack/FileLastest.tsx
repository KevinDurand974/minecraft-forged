import { File } from "@forged/graphql/schema";
import { FC, useCallback, useEffect, useRef } from "react";

interface Props {
  files: File[];
}

const FileLatest: FC<Props> = ({ files }) => {
  // Parse html from changelog
  const parseDescriptionLinks = useCallback((description: string) => {
    const _dUri = (text: string) =>
      decodeURIComponent(decodeURIComponent(text));
    let desc = description;
    if (desc) {
      const matches = description.match(
        /href="\/linkout\?remoteUrl=([\w+\S]+)\"/gm
      );
      matches?.forEach(match => {
        desc = desc.replace(
          match,
          _dUri(
            match.replace(
              /href="\/linkout\?remoteUrl=([\w+\S]+)\"/,
              `href="$1" target="_blank"`
            )
          )
        );
      });
    } else {
      desc = `<p>No changelog</p>`;
    }
    return desc;
  }, []);

  const parseSpoilerDescription = useCallback((description: string) => {
    const desc = description.replace(
      /<\w{1,}\sclass\=\"spoiler/g,
      (match, index) => {
        const spoilerBtn = `<button id="spoiler-${index}" class="text-[1.2rem] text-normal text-center rounded-lg px-4 py-2 mb-2 bg-accent font-semibold">Spoiler (click to show)</button>\n`;
        const replacedMatch =
          match + ` hidden" attr-linkedto="spoiler-${index}"`;
        return spoilerBtn + replacedMatch;
      }
    );
    return desc;
  }, []);

  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSpoilerClick = (event: any) => {
      const spoilerAttr = event.target.getAttribute("id");
      const spoilerElement = document.querySelector(
        `[attr-linkedto="${spoilerAttr}"]`
      );
      if (spoilerElement) spoilerElement.classList.toggle("hidden");
    };

    if (!descriptionRef.current) return;
    const descElement = descriptionRef.current;
    const spoilerArray = descElement.querySelectorAll("button[id^='spoiler-']");
    spoilerArray.forEach(spoiler => {
      spoiler.addEventListener("click", handleSpoilerClick);
    });

    return () => {
      spoilerArray.forEach(spoiler => {
        spoiler.removeEventListener("click", handleSpoilerClick);
      });
    };
  }, [descriptionRef]);

  return (
    <div className="mb-4">
      <div className="flex items-end gap-2 mb-4">
        <h3 className="text-2xl font-semibold">Last uploaded file changelog</h3>
        <h5 className="text-lg font-semibold text-opacity-60 text-normal">
          {files[0].displayName}
        </h5>
      </div>

      <div
        ref={descriptionRef}
        dangerouslySetInnerHTML={{
          __html: parseSpoilerDescription(
            parseDescriptionLinks(files[0].changelog!)
          ),
        }}
        className="max-h-60 overflow-auto user-reset p-4 border-2 border-accent border-opacity-75"
      />
    </div>
  );
};

export default FileLatest;
