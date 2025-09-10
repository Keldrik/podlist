import React from 'react';
import Link from 'next/link';

export class paginationData {
  public previous: number;
  public previousas: string;
  public next: number;
  public nextas: string;
  public href: string;
  constructor(
    public url: string,
    public page: string,
    public max: number,
    public current: number,
  ) {
    this.previous = current - 1;
    this.previousas = url + this.previous.toString();
    this.next = current + 1;
    this.nextas = url + this.next.toString();
    this.href = url + page;
  }
}

export const Pagination: React.FunctionComponent<{ pd: paginationData }> = ({
  pd,
}) => {
  return (
    <div className="pt-8 flex items-center justify-between sm:px-2">
      <div className="flex-1 flex justify-between sm:hidden items-center">
        {pd.previous ? (
          <Link
            href={pd.url + pd.page}
            as={pd.previousas}
            className="relative inline-flex py-2 text-xl leading-relaxed font-semibold uppercase bg-yellow-500 w-24 hover:bg-yellow-400"
          >
            <span className="text-center w-full">Zurück</span>
          </Link>
        ) : null}
        <span className="text-xl">{`Seite ${pd.current.toString()} / ${pd.max.toString()}`}</span>
        {pd.next < pd.max + 1 ? (
          <Link
            href={pd.url + pd.page}
            as={pd.nextas}
            className="ml-3 relative inline-flex px-1 py-2 text-xl leading-relaxed font-semibold uppercase bg-yellow-500 w-24 hover:bg-yellow-400"
          >
            <span className="text-center w-full">Weiter</span>
          </Link>
        ) : null}
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <span className="text-xl">{`Seite ${pd.current.toString()} / ${pd.max.toString()}`}</span>
        <div>
          <div className="relative z-0 inline-flex shadow-xs">
            {pd.previous ? (
              <div className="paggrpbtn hover:bg-yellow-400">
                <Link href={pd.url + pd.page} as={pd.previousas}>
                  <svg
                    className="w-full h-full"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
                  </svg>
                </Link>
              </div>
            ) : null}

            {pd.current - 3 > 0 ? (
              <div className="-ml-px paggrpbtn hover:bg-yellow-400">
                <Link
                  href={pd.url + pd.page}
                  as={pd.url + (pd.current - 3).toString()}
                  className="w-full text-center"
                >
                  {(pd.current - 3).toString()}
                </Link>
              </div>
            ) : null}

            {pd.current - 2 > 0 ? (
              <div className="-ml-px paggrpbtn hover:bg-yellow-400">
                <Link
                  href={pd.url + pd.page}
                  as={pd.url + (pd.current - 2).toString()}
                  className="w-full text-center"
                >
                  {(pd.current - 2).toString()}
                </Link>
              </div>
            ) : null}

            {pd.previous ? (
              <div className="-ml-px paggrpbtn hover:bg-yellow-400">
                <Link
                  href={pd.url + pd.page}
                  as={pd.previousas}
                  className="w-full text-center"
                >
                  {pd.previous.toString()}
                </Link>
              </div>
            ) : null}

            <div className="-ml-px paggrpbtn bg-yellow-300">
              <span className="w-full text-center text-gray-900">
                {pd.current.toString()}
              </span>
            </div>

            {pd.next < pd.max + 1 ? (
              <div className="-ml-px paggrpbtn hover:bg-yellow-400">
                <Link
                  href={pd.url + pd.page}
                  as={pd.nextas}
                  className="w-full text-center"
                >
                  {pd.next.toString()}
                </Link>
              </div>
            ) : null}

            {pd.current + 2 < pd.max + 1 ? (
              <div className="-ml-px paggrpbtn hover:bg-yellow-400">
                <Link
                  href={pd.url + pd.page}
                  as={pd.url + (pd.current + 2).toString()}
                  className="w-full text-center"
                >
                  {(pd.current + 2).toString()}
                </Link>
              </div>
            ) : null}

            {pd.current + 3 < pd.max + 1 ? (
              <div className="-ml-px paggrpbtn hover:bg-yellow-400">
                <Link
                  href={pd.url + pd.page}
                  as={pd.url + (pd.current + 3).toString()}
                  className="w-full text-center"
                >
                  {(pd.current + 3).toString()}
                </Link>
              </div>
            ) : null}

            {pd.next < pd.max + 1 ? (
              <div className="paggrpbtn hover:bg-yellow-400">
                <Link href={pd.url + pd.page} as={pd.nextas}>
                  <svg
                    className="w-full h-full"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                  </svg>
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
