/*
   Copyright 2019 Balena

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

declare module '@balena/proxy-protocol-parser' {
    export interface ProxyHeaders {
        remoteAddress: string;
        remotePort: number;
        localAddress: string;
        localPort: number;
    }

    export const decode: (buf: Buffer, validate?: boolean) => ProxyHeaders | null;
    export const v2_decode: (
        buf: Buffer,
        validate?: boolean,
    ) => ProxyHeaders | null;
    export const v2_encode: (headers: ProxyHeaders) => Buffer | null;
}
