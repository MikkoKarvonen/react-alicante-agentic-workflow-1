export interface ActionResult {
  success: boolean;
  message: string;
}

export function actionSuccess(message: string): ActionResult {
  return { success: true, message };
}

export function actionError(message: string): ActionResult {
  return { success: false, message };
}
