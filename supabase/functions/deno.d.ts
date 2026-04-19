/**
 * Local type definitions for Deno to resolve 'Cannot find name Deno' errors
 * if the Deno VS Code extension is not installed.
 */

declare namespace Deno {
  export function serve(handler: (req: Request) => Promise<Response> | Response): void;
  export namespace env {
    export function get(key: string): string | undefined;
  }
}
