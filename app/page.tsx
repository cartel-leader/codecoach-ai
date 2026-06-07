"use client"
import { useState } from "react"
import Editor from "@monaco-editor/react"

type Difficulty = "Easy" | "Medium" | "Hard"

interface Problem {
  id: number
  title: string
  difficulty: Difficulty
  category: string
  description: string
  example: string
  starterCode: string
}

const PROBLEMS: Problem[] = [
  { id: 1, title: "Two Sum", difficulty: "Easy", category: "Arrays", description: "Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.", example: "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]", starterCode: `def two_sum(nums, target):\n    # Write your solution here\n    pass\n\nprint(two_sum([2,7,11,15], 9))` },
  { id: 2, title: "Best Time to Buy and Sell Stock", difficulty: "Easy", category: "Arrays", description: "Find the maximum profit by choosing a single day to buy and a different day to sell.", example: "Input: [7,1,5,3,6,4]\nOutput: 5", starterCode: `def max_profit(prices):\n    # Write your solution here\n    pass\n\nprint(max_profit([7,1,5,3,6,4]))` },
  { id: 3, title: "Contains Duplicate", difficulty: "Easy", category: "Arrays", description: "Return true if any value appears at least twice in the array.", example: "Input: [1,2,3,1]\nOutput: True", starterCode: `def contains_duplicate(nums):\n    # Write your solution here\n    pass\n\nprint(contains_duplicate([1,2,3,1]))` },
  { id: 4, title: "Maximum Subarray", difficulty: "Medium", category: "Arrays", description: "Find the contiguous subarray with the largest sum (Kadane's Algorithm).", example: "Input: [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6", starterCode: `def max_subarray(nums):\n    # Write your solution here\n    pass\n\nprint(max_subarray([-2,1,-3,4,-1,2,1,-5,4]))` },
  { id: 5, title: "Product of Array Except Self", difficulty: "Medium", category: "Arrays", description: "Return array where each element is product of all other elements. No division allowed.", example: "Input: [1,2,3,4]\nOutput: [24,12,8,6]", starterCode: `def product_except_self(nums):\n    # Write your solution here\n    pass\n\nprint(product_except_self([1,2,3,4]))` },
  { id: 6, title: "3Sum", difficulty: "Medium", category: "Arrays", description: "Find all unique triplets that sum to zero.", example: "Input: [-1,0,1,2,-1,-4]\nOutput: [[-1,-1,2],[-1,0,1]]", starterCode: `def three_sum(nums):\n    # Write your solution here\n    pass\n\nprint(three_sum([-1,0,1,2,-1,-4]))` },
  { id: 7, title: "Trapping Rain Water", difficulty: "Hard", category: "Arrays", description: "Given n non-negative integers representing elevation map, compute how much water it can trap.", example: "Input: [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6", starterCode: `def trap(height):\n    # Write your solution here\n    pass\n\nprint(trap([0,1,0,2,1,0,1,3,2,1,2,1]))` },
  { id: 8, title: "Valid Anagram", difficulty: "Easy", category: "Strings", description: "Given two strings s and t, return true if t is an anagram of s.", example: "Input: s='anagram', t='nagaram'\nOutput: True", starterCode: `def is_anagram(s, t):\n    # Write your solution here\n    pass\n\nprint(is_anagram('anagram', 'nagaram'))` },
  { id: 9, title: "Valid Palindrome", difficulty: "Easy", category: "Strings", description: "Check if string is palindrome considering only alphanumeric characters.", example: "Input: 'A man a plan a canal Panama'\nOutput: True", starterCode: `def is_palindrome(s):\n    # Write your solution here\n    pass\n\nprint(is_palindrome('A man a plan a canal Panama'))` },
  { id: 10, title: "Longest Substring Without Repeating", difficulty: "Medium", category: "Strings", description: "Find the length of the longest substring without repeating characters.", example: "Input: 'abcabcbb'\nOutput: 3", starterCode: `def length_of_longest_substring(s):\n    # Write your solution here\n    pass\n\nprint(length_of_longest_substring('abcabcbb'))` },
  { id: 11, title: "Group Anagrams", difficulty: "Medium", category: "Strings", description: "Group strings that are anagrams of each other.", example: "Input: ['eat','tea','tan','ate','nat','bat']\nOutput: [['eat','tea','ate'],['tan','nat'],['bat']]", starterCode: `def group_anagrams(strs):\n    # Write your solution here\n    pass\n\nprint(group_anagrams(['eat','tea','tan','ate','nat','bat']))` },
  { id: 12, title: "Longest Palindromic Substring", difficulty: "Medium", category: "Strings", description: "Find the longest palindromic substring.", example: "Input: 'babad'\nOutput: 'bab'", starterCode: `def longest_palindrome(s):\n    # Write your solution here\n    pass\n\nprint(longest_palindrome('babad'))` },
  { id: 13, title: "Reverse Linked List", difficulty: "Easy", category: "Linked Lists", description: "Reverse a singly linked list.", example: "Input: 1->2->3->4->5\nOutput: 5->4->3->2->1", starterCode: `class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef reverse_list(head):\n    # Write your solution here\n    pass` },
  { id: 14, title: "Detect Cycle in Linked List", difficulty: "Easy", category: "Linked Lists", description: "Determine if the linked list has a cycle using Floyd's algorithm.", example: "Input: 3->2->0->-4 (cycle)\nOutput: True", starterCode: `def has_cycle(head):\n    # Write your solution here (use Floyd's tortoise and hare)\n    pass` },
  { id: 15, title: "Merge Two Sorted Lists", difficulty: "Easy", category: "Linked Lists", description: "Merge two sorted linked lists and return the sorted list.", example: "Input: 1->2->4, 1->3->4\nOutput: 1->1->2->3->4->4", starterCode: `def merge_two_lists(l1, l2):\n    # Write your solution here\n    pass` },
  { id: 16, title: "LRU Cache", difficulty: "Hard", category: "Linked Lists", description: "Design LRU Cache with O(1) get and put operations.", example: "LRUCache(2) → put(1,1) → put(2,2) → get(1)=1 → put(3,3) → get(2)=-1", starterCode: `class LRUCache:\n    def __init__(self, capacity):\n        pass\n    def get(self, key):\n        pass\n    def put(self, key, value):\n        pass` },
  { id: 17, title: "Maximum Depth of Binary Tree", difficulty: "Easy", category: "Trees", description: "Find the maximum depth of a binary tree.", example: "Input: [3,9,20,null,null,15,7]\nOutput: 3", starterCode: `class TreeNode:\n    def __init__(self, val=0):\n        self.val = val\n        self.left = None\n        self.right = None\n\ndef max_depth(root):\n    # Write your solution here\n    pass` },
  { id: 18, title: "Invert Binary Tree", difficulty: "Easy", category: "Trees", description: "Invert a binary tree (mirror it).", example: "Input: [4,2,7,1,3,6,9]\nOutput: [4,7,2,9,6,3,1]", starterCode: `def invert_tree(root):\n    # Write your solution here\n    pass` },
  { id: 19, title: "Validate BST", difficulty: "Medium", category: "Trees", description: "Determine if a binary tree is a valid binary search tree.", example: "Input: [2,1,3]\nOutput: True", starterCode: `def is_valid_bst(root):\n    # Write your solution here\n    pass` },
  { id: 20, title: "Level Order Traversal", difficulty: "Medium", category: "Trees", description: "Return level order traversal of binary tree values.", example: "Input: [3,9,20,null,null,15,7]\nOutput: [[3],[9,20],[15,7]]", starterCode: `from collections import deque\n\ndef level_order(root):\n    # Write your solution here (use BFS)\n    pass` },
  { id: 21, title: "Lowest Common Ancestor", difficulty: "Medium", category: "Trees", description: "Find lowest common ancestor of two nodes in a BST.", example: "Input: root=[6,2,8], p=2, q=8\nOutput: 6", starterCode: `def lowest_common_ancestor(root, p, q):\n    # Write your solution here\n    pass` },
  { id: 22, title: "Climbing Stairs", difficulty: "Easy", category: "Dynamic Programming", description: "Count ways to climb n stairs taking 1 or 2 steps at a time.", example: "Input: n=3\nOutput: 3", starterCode: `def climb_stairs(n):\n    # Write your solution here\n    pass\n\nprint(climb_stairs(5))` },
  { id: 23, title: "House Robber", difficulty: "Medium", category: "Dynamic Programming", description: "Max money you can rob without robbing adjacent houses.", example: "Input: [2,7,9,3,1]\nOutput: 12", starterCode: `def rob(nums):\n    # Write your solution here\n    pass\n\nprint(rob([2,7,9,3,1]))` },
  { id: 24, title: "Coin Change", difficulty: "Medium", category: "Dynamic Programming", description: "Find minimum coins needed to make amount.", example: "Input: coins=[1,5,11], amount=11\nOutput: 1", starterCode: `def coin_change(coins, amount):\n    # Write your solution here\n    pass\n\nprint(coin_change([1,5,11], 11))` },
  { id: 25, title: "Longest Common Subsequence", difficulty: "Medium", category: "Dynamic Programming", description: "Find length of longest common subsequence of two strings.", example: "Input: 'abcde', 'ace'\nOutput: 3", starterCode: `def lcs(text1, text2):\n    # Write your solution here\n    pass\n\nprint(lcs('abcde', 'ace'))` },
  { id: 26, title: "0/1 Knapsack", difficulty: "Hard", category: "Dynamic Programming", description: "Maximize value in knapsack with weight limit. Each item used once.", example: "Input: weights=[1,2,3], values=[6,10,12], W=5\nOutput: 22", starterCode: `def knapsack(weights, values, W):\n    # Write your solution here\n    pass\n\nprint(knapsack([1,2,3], [6,10,12], 5))` },
  { id: 27, title: "Number of Islands", difficulty: "Medium", category: "Graphs", description: "Count number of islands in a 2D grid using DFS/BFS.", example: "Input: grid with 1s and 0s\nOutput: 3", starterCode: `def num_islands(grid):\n    # Write your solution here (use DFS)\n    pass` },
  { id: 28, title: "Clone Graph", difficulty: "Medium", category: "Graphs", description: "Deep clone a connected undirected graph.", example: "Input: Node with val=1, neighbors=[2,4]\nOutput: Cloned graph", starterCode: `def clone_graph(node):\n    # Write your solution here\n    pass` },
  { id: 29, title: "Course Schedule", difficulty: "Medium", category: "Graphs", description: "Determine if you can finish all courses (cycle detection in directed graph).", example: "Input: numCourses=2, prerequisites=[[1,0]]\nOutput: True", starterCode: `def can_finish(numCourses, prerequisites):\n    # Write your solution here (topological sort)\n    pass\n\nprint(can_finish(2, [[1,0]]))` },
  { id: 30, title: "Word Ladder", difficulty: "Hard", category: "Graphs", description: "Find shortest transformation sequence from beginWord to endWord.", example: "Input: begin='hit', end='cog', wordList=[...]\nOutput: 5", starterCode: `from collections import deque\n\ndef ladder_length(beginWord, endWord, wordList):\n    # Write your solution here (BFS)\n    pass` },
  { id: 31, title: "Binary Search", difficulty: "Easy", category: "Binary Search", description: "Implement binary search on a sorted array.", example: "Input: nums=[-1,0,3,5,9,12], target=9\nOutput: 4", starterCode: `def search(nums, target):\n    # Write your solution here\n    pass\n\nprint(search([-1,0,3,5,9,12], 9))` },
  { id: 32, title: "Search in Rotated Array", difficulty: "Medium", category: "Binary Search", description: "Search target in a rotated sorted array in O(log n).", example: "Input: nums=[4,5,6,7,0,1,2], target=0\nOutput: 4", starterCode: `def search_rotated(nums, target):\n    # Write your solution here\n    pass\n\nprint(search_rotated([4,5,6,7,0,1,2], 0))` },
  { id: 33, title: "Find Minimum in Rotated Array", difficulty: "Medium", category: "Binary Search", description: "Find minimum element in rotated sorted array.", example: "Input: [3,4,5,1,2]\nOutput: 1", starterCode: `def find_min(nums):\n    # Write your solution here\n    pass\n\nprint(find_min([3,4,5,1,2]))` },
  { id: 34, title: "Valid Parentheses", difficulty: "Easy", category: "Stack", description: "Determine if brackets are valid and properly closed.", example: "Input: '()[]{}'\nOutput: True", starterCode: `def is_valid(s):\n    # Write your solution here\n    pass\n\nprint(is_valid('()[]{}'))` },
  { id: 35, title: "Min Stack", difficulty: "Medium", category: "Stack", description: "Design stack that supports push, pop, top, and getMin in O(1).", example: "MinStack → push(-2),push(0),push(-3) → getMin()=-3", starterCode: `class MinStack:\n    def __init__(self):\n        pass\n    def push(self, val):\n        pass\n    def pop(self):\n        pass\n    def top(self):\n        pass\n    def get_min(self):\n        pass` },
  { id: 36, title: "Daily Temperatures", difficulty: "Medium", category: "Stack", description: "For each day, find how many days until a warmer temperature.", example: "Input: [73,74,75,71,69,72,76,73]\nOutput: [1,1,4,2,1,1,0,0]", starterCode: `def daily_temperatures(temps):\n    # Write your solution here (monotonic stack)\n    pass\n\nprint(daily_temperatures([73,74,75,71,69,72,76,73]))` },
  { id: 37, title: "Kth Largest Element", difficulty: "Medium", category: "Heap", description: "Find kth largest element in an array.", example: "Input: [3,2,1,5,6,4], k=2\nOutput: 5", starterCode: `import heapq\n\ndef find_kth_largest(nums, k):\n    # Write your solution here\n    pass\n\nprint(find_kth_largest([3,2,1,5,6,4], 2))` },
  { id: 38, title: "Top K Frequent Elements", difficulty: "Medium", category: "Heap", description: "Return k most frequent elements.", example: "Input: [1,1,1,2,2,3], k=2\nOutput: [1,2]", starterCode: `def top_k_frequent(nums, k):\n    # Write your solution here\n    pass\n\nprint(top_k_frequent([1,1,1,2,2,3], 2))` },
  { id: 39, title: "Subsets", difficulty: "Medium", category: "Recursion", description: "Return all possible subsets of an array.", example: "Input: [1,2,3]\nOutput: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]", starterCode: `def subsets(nums):\n    # Write your solution here (backtracking)\n    pass\n\nprint(subsets([1,2,3]))` },
  { id: 40, title: "Permutations", difficulty: "Medium", category: "Recursion", description: "Return all possible permutations of an array.", example: "Input: [1,2,3]\nOutput: [[1,2,3],[1,3,2],[2,1,3],...]", starterCode: `def permute(nums):\n    # Write your solution here (backtracking)\n    pass\n\nprint(permute([1,2,3]))` },
]

const CATEGORIES = ["All", "Arrays", "Strings", "Linked Lists", "Trees", "Dynamic Programming", "Graphs", "Binary Search", "Stack", "Heap", "Recursion"]

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  Easy: "text-green-400 bg-green-400/10 border-green-400/20",
  Medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  Hard: "text-red-400 bg-red-400/10 border-red-400/20"
}

export default function Home() {
  const [selectedProblem, setSelectedProblem] = useState<Problem>(PROBLEMS[0])
  const [code, setCode] = useState<string>(PROBLEMS[0].starterCode)
  const [review, setReview] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  function selectProblem(problem: Problem) {
    setSelectedProblem(problem)
    setCode(problem.starterCode)
    setReview(null)
  }

  async function submitCode() {
    if (!code.trim() || loading) return
    setLoading(true)
    setReview(null)
    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, problem: selectedProblem })
      })
      const data = await res.json()
      setReview(data.review)
    } catch {
      setReview("Something went wrong. Try again!")
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white flex flex-col">
      <nav className="border-b border-white/5 px-6 py-3 flex items-center justify-between bg-[#0d0d0d]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚔️</span>
          <span className="font-black text-lg bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">CodeCoach AI</span>
          <span className="text-xs text-gray-500 border border-white/10 rounded-full px-2 py-0.5">Beta</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse" />
          AI Interviewer Online
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden h-[calc(100vh-57px)]">
        <div className="w-72 border-r border-white/5 flex flex-col bg-[#111111]">
          <div className="p-4 border-b border-white/5">
            <h2 className="font-bold text-sm text-gray-300 uppercase tracking-wider mb-3">Categories</h2>
            <div className="flex flex-col gap-1">
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setSelectedCategory(cat)}
                  className={`text-left px-3 py-1.5 rounded-lg text-sm transition-all ${selectedCategory === cat ? "bg-violet-600/20 text-violet-400 font-semibold" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
                  {cat} {cat === "All" ? `(${PROBLEMS.length})` : `(${PROBLEMS.filter(p => p.category === cat).length})`}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {PROBLEMS.filter(p => selectedCategory === "All" || p.category === selectedCategory).map(p => (
              <button key={p.id} onClick={() => selectProblem(p)}
                className={`w-full text-left px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-all ${selectedProblem.id === p.id ? "bg-violet-600/10 border-l-2 border-l-violet-500" : ""}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm">{p.title}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${DIFFICULTY_COLORS[p.difficulty]}`}>{p.difficulty}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="border-b border-white/5 p-5 bg-[#111111]">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-xl font-black">{selectedProblem.title}</h1>
              <span className={`text-xs px-2 py-0.5 rounded-full border ${DIFFICULTY_COLORS[selectedProblem.difficulty]}`}>{selectedProblem.difficulty}</span>
              <span className="text-xs text-gray-500 border border-white/10 rounded-full px-2 py-0.5">{selectedProblem.category}</span>
            </div>
            <p className="text-gray-400 text-sm mb-2">{selectedProblem.description}</p>
            <pre className="text-xs text-gray-500 bg-white/3 rounded-lg p-3 font-mono">{selectedProblem.example}</pre>
          </div>

          <div className="flex-1 overflow-hidden">
            <Editor
              height="100%"
              defaultLanguage="python"
              theme="vs-dark"
              value={code}
              onChange={(val) => setCode(val || "")}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                padding: { top: 16 },
                fontFamily: "JetBrains Mono, Fira Code, monospace",
              }}
            />
          </div>

          <div className="border-t border-white/5 p-4 bg-[#111111] flex items-center justify-between">
            <span className="text-xs text-gray-500">Python · AI will review your logic, complexity & style</span>
            <button onClick={submitCode} disabled={loading}
              className="bg-violet-600 hover:bg-violet-700 disabled:opacity-50 px-6 py-2.5 rounded-lg font-bold text-sm transition-all hover:scale-105 flex items-center gap-2">
              {loading ? "🤔 Analyzing..." : "⚡ Get AI Review"}
            </button>
          </div>
        </div>

        <div className="w-96 border-l border-white/5 flex flex-col bg-[#111111]">
          <div className="p-4 border-b border-white/5">
            <h2 className="font-bold text-sm text-gray-300 uppercase tracking-wider">🤖 AI Code Reviewer</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {!review && !loading && (
              <div className="text-center mt-20">
                <div className="text-5xl mb-4">👨‍💻</div>
                <p className="text-gray-500 text-sm">Write your solution and hit<br /><span className="text-violet-400">Get AI Review</span> to get roasted</p>
              </div>
            )}
            {loading && (
              <div className="text-center mt-20">
                <div className="text-5xl mb-4 animate-bounce">🧠</div>
                <p className="text-gray-400 text-sm">Analyzing your code...</p>
                <p className="text-gray-600 text-xs mt-1">Checking complexity, style & logic</p>
              </div>
            )}
            {review && (
              <div className="bg-white/3 border border-white/10 rounded-xl p-4 text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                {review}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}