/*
 * Copyright 2026, OpenRemote Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
export const DefaultColor4: string = "#0215C1"; // Primary
export const DefaultColor7: string = "#FFFFFF"; // Secondary
export const DefaultColor1: string = "#FFFFFF"; // Surface
export const DefaultColor2: string = "#F6F8FC"; // Background
export const DefaultColor5: string = "#D2D2D2"; // Borders and lines
export const DefaultColor6: string = "#E60050"; // Invalid/Error
export const DefaultColor8: string = "#FFFFFF"; // On Primary
export const DefaultColor3: string = "#4B4B4B"; // Text / On Secondary
export const DefaultColor9: string = "#000046"; // On Background
export const DefaultColor10: string = "#4B4B4B"; // On Surface
export const DefaultColor11: string = "#FFFFFF"; // On Error
export const DefaultBoxShadowBottom: string = "0 1px 0 rgba(0,21,100,0.12)";
export const DefaultBoxShadow: string = "0 8px 24px rgba(0,21,100,0.10)";
export const DefaultHeaderHeight: string = "50px";
export const DefaultDisabledOpacity: string = "0.3";

/** DPBIO telemetry palette. Index order stays shared by charts and their settings editors. */
export const DefaultChartColors: readonly string[] = [
  "#0215C1",
  "#0082FF",
  "#007FA3",
  "#4B6C00",
  "#795700",
  "#E60050",
  "#4B4B4B",
  "#000064",
] as const;
