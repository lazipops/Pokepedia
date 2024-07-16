import {atomWithStorage} from "jotai/utils";

export var todoAtom = atomWithStorage("todos", []);