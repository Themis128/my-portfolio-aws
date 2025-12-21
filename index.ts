import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";
import { initSchema } from "@aws-amplify/datastore";

import { schema } from "./schema";

const __modelMeta__ = Symbol('__modelMeta__');
const ManagedIdentifier = Symbol('ManagedIdentifier');
const LazyLoading = Symbol('LazyLoading');
const LazyLoadingDisabled = Symbol('LazyLoadingDisabled');



type EagerTodoModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Todo, 'id'>;
  };
  readonly id: string;
  readonly content?: string | null;
  readonly done?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly owner?: string | null;
}

type LazyTodoModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Todo, 'id'>;
  };
  readonly id: string;
  readonly content?: string | null;
  readonly done?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly owner?: string | null;
}

export declare type TodoModel = LazyLoading extends LazyLoadingDisabled ? EagerTodoModel : LazyTodoModel

export declare const TodoModel: (new (init: ModelInit<TodoModel>) => TodoModel) & {
  copyOf(source: TodoModel, mutator: (draft: MutableModel<TodoModel>) => MutableModel<TodoModel> | void): TodoModel;
}



const { Todo } = initSchema(schema) as {
  Todo: PersistentModelConstructor<TodoModel>;
};

export {
  Todo
};