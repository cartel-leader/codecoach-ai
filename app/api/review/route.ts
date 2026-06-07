import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { code, problem } = await req.json()

  const reviews = [
    `🔍 **Code Review: ${problem.title}**\n\nYour approach shows basic understanding, but let's dig deeper.\n\n⏱️ **Time Complexity:** Looks like O(n²) — you're using nested loops where a hash map could solve this in O(n). That's a red flag in any serious interview.\n\n💾 **Space Complexity:** O(1) extra space is good, but you're trading it for terrible time performance.\n\n🐛 **Correctness:** Your logic handles the happy path but what about edge cases? Empty array? Negative numbers? Duplicate values?\n\n🔧 **What to improve:**\n- Use a dictionary/hash map for O(n) lookup\n- Add edge case handling at the top\n- Variable names like 'i' and 'j' are lazy — use 'left', 'right' or meaningful names\n\nVerdict: Would not pass a Google/Amazon screen in current state. Optimize the complexity first.`,

    `🎯 **Code Review: ${problem.title}**\n\nNot bad, but not good enough for a top company.\n\n⏱️ **Time Complexity:** O(n log n) — acceptable but an O(n) solution exists. Do you know it?\n\n💾 **Space Complexity:** O(n) — reasonable tradeoff.\n\n✅ **Correctness:** Core logic is right. But you're missing:\n- Input validation\n- Edge case: what if input is empty?\n- What if there are multiple valid answers?\n\n🔧 **Improvements:**\n- Think about whether you need that extra loop\n- Add a comment explaining your approach — interviewers love that\n- Consider using Python built-ins where possible\n\nVerdict: Decent attempt. Clean it up and handle edge cases and this could pass a mid-level screen.`,

    `💀 **Code Review: ${problem.title}**\n\nAlright, let's be honest.\n\n⏱️ **Time Complexity:** O(n²) brute force. In 2025, this won't cut it past the first round at any product company.\n\n💾 **Space Complexity:** O(1) — at least you didn't waste memory.\n\n🐛 **Bugs Found:**\n- Off-by-one error likely on line 3\n- No return statement in edge case path\n- The pass statement means this literally does nothing right now\n\n🔧 **What a senior engineer would do:**\n- Hash map for O(n) time\n- Early return for invalid inputs\n- Single pass through the array\n\nVerdict: Go back to basics. This needs significant work before it's interview-ready. But the structure shows you understand the problem — now optimize it.`
  ]

  const randomReview = reviews[Math.floor(Math.random() * reviews.length)]
  
  // Simulate thinking time
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  return NextResponse.json({ review: randomReview })
}