export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export interface QianfanChatResp {
  /**
   * 本轮对话的id
   */
  id: string;
  /**
   * 回包类型。
   *
   * chat.completion：多轮对话返回
   */
  object: string;
  /**
   * 时间戳
   */
  created: number;
  /**
   * 表示当前子句的序号。只有在流式接口模式下会返回该字段
   */
  sentence_id?: number;
  /**
   * 表示当前子句是否是最后一句。只有在流式接口模式下会返回该字段
   */
  is_end?: boolean;
  /**
   * 对话返回结果
   */
  result: string;
  /**
   * 1：表示输入内容无安全风险
   * 0：表示输入内容有安全风险
   */
  is_safe?: number;
  /**
   * token统计信息，token数 = 汉字数+单词数*1.3 （仅为估算逻辑）
   */
  usage: TokenUsage;
  /**
   * 当前生成的结果是否被截断
   */
  is_truncated?: boolean;
  /**
   * 表示用户输入是否存在安全，是否关闭当前会话，清理历史会话信息
   *
   * true：是，表示用户输入存在安全风险，建议关闭当前会话，清理历史会话信息
   * false：否，表示用户输入无安全风险
   */
  need_clear_history: boolean;
  /**
   * 当 need_clear_history 为 true 时，此字段会告知第几轮对话有敏感信息，如果是当前问题，ban_round=-1
   */
  ban_round: number;
}

interface TokenUsage {
  /**
   * 问题tokens数
   */
  prompt_tokens: number;
  /**
   * 回答tokens数
   */
  completion_tokens?: number;
  /**
   * tokens总数
   */
  total_tokens: number;
}