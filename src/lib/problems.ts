export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  companies: string[];
  acceptanceRate: number;
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  hints: string[];
  testCases: {
    input: any;
    expectedOutput: any;
  }[];
  solutions: {
    language: string;
    code: string;
    timeComplexity: string;
    spaceComplexity: string;
  }[];
  relatedTopics: string[];
  premium: boolean;
}

export const problems: Problem[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    companies: ["Google", "Amazon", "Microsoft", "Apple", "Facebook", "Netflix", "Uber", "Airbnb"],
    acceptanceRate: 45.2,
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]"
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]"
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    hints: [
      "A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Again, the thing that is tricky is that we have to be careful about the order of the for loops.",
      "The second train of thought is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?"
    ],
    testCases: [
      { input: { nums: [2, 7, 11, 15], target: 9 }, expectedOutput: [0, 1] },
      { input: { nums: [3, 2, 4], target: 6 }, expectedOutput: [1, 2] },
      { input: { nums: [3, 3], target: 6 }, expectedOutput: [0, 1] }
    ],
    solutions: [
      {
        language: "JavaScript",
        code: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)"
      }
    ],
    relatedTopics: ["Array", "Hash Table"],
    premium: false
  },
  {
    id: "add-two-numbers",
    title: "Add Two Numbers",
    difficulty: "Medium",
    category: "Linked List",
    companies: ["Microsoft", "Amazon", "Google", "Facebook", "Apple", "Bloomberg", "Adobe"],
    acceptanceRate: 38.1,
    description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.`,
    examples: [
      {
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
        explanation: "342 + 465 = 807"
      },
      {
        input: "l1 = [0], l2 = [0]",
        output: "[0]"
      },
      {
        input: "l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]",
        output: "[8,9,9,9,0,0,0,1]"
      }
    ],
    constraints: [
      "The number of nodes in each linked list is in the range [1, 100].",
      "0 <= Node.val <= 9",
      "It is guaranteed that the list represents a number that does not have leading zeros."
    ],
    hints: [
      "Keep track of the carry using a variable and simulate digits-by-digits sum starting from the head of list, which contains the least-significant digit.",
      "Just like how you would sum two numbers on a piece of paper, we begin by summing the least-significant digits, which is the head of l1 and l2."
    ],
    testCases: [
      { input: { l1: [2, 4, 3], l2: [5, 6, 4] }, expectedOutput: [7, 0, 8] },
      { input: { l1: [0], l2: [0] }, expectedOutput: [0] },
      { input: { l1: [9, 9, 9, 9, 9, 9, 9], l2: [9, 9, 9, 9] }, expectedOutput: [8, 9, 9, 9, 0, 0, 0, 1] }
    ],
    solutions: [
      {
        language: "JavaScript",
        code: `function addTwoNumbers(l1, l2) {
    let dummy = new ListNode(0);
    let current = dummy;
    let carry = 0;
    
    while (l1 || l2 || carry) {
        let sum = carry;
        if (l1) {
            sum += l1.val;
            l1 = l1.next;
        }
        if (l2) {
            sum += l2.val;
            l2 = l2.next;
        }
        
        carry = Math.floor(sum / 10);
        current.next = new ListNode(sum % 10);
        current = current.next;
    }
    
    return dummy.next;
}`,
        timeComplexity: "O(max(m,n))",
        spaceComplexity: "O(max(m,n))"
      }
    ],
    relatedTopics: ["Linked List", "Math", "Recursion"],
    premium: false
  },
  {
    id: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "String",
    companies: ["Amazon", "Google", "Microsoft", "Facebook", "Apple", "Bloomberg", "Uber", "Adobe"],
    acceptanceRate: 33.8,
    description: `Given a string s, find the length of the longest substring without repeating characters.`,
    examples: [
      {
        input: "s = \"abcabcbb\"",
        output: "3",
        explanation: "The answer is \"abc\", with the length of 3."
      },
      {
        input: "s = \"bbbbb\"",
        output: "1",
        explanation: "The answer is \"b\", with the length of 1."
      },
      {
        input: "s = \"pwwkew\"",
        output: "3",
        explanation: "The answer is \"wke\", with the length of 3. Notice that the answer must be a substring, \"pwke\" is a subsequence and not a substring."
      }
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    hints: [
      "Use a sliding window approach with two pointers.",
      "Use a hash set to keep track of characters in the current window."
    ],
    testCases: [
      { input: { s: "abcabcbb" }, expectedOutput: 3 },
      { input: { s: "bbbbb" }, expectedOutput: 1 },
      { input: { s: "pwwkew" }, expectedOutput: 3 },
      { input: { s: "" }, expectedOutput: 0 }
    ],
    solutions: [
      {
        language: "JavaScript",
        code: `function lengthOfLongestSubstring(s) {
    let left = 0;
    let maxLength = 0;
    const charSet = new Set();
    
    for (let right = 0; right < s.length; right++) {
        while (charSet.has(s[right])) {
            charSet.delete(s[left]);
            left++;
        }
        charSet.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(min(m,n))"
      }
    ],
    relatedTopics: ["Hash Table", "String", "Sliding Window"],
    premium: false
  },
  {
    id: "median-of-two-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    category: "Array",
    companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple", "Uber", "Adobe", "Bloomberg"],
    acceptanceRate: 35.2,
    description: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).`,
    examples: [
      {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.00000",
        explanation: "merged array = [1,2,3] and median is 2."
      },
      {
        input: "nums1 = [1,2], nums2 = [3,4]",
        output: "2.50000",
        explanation: "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5."
      }
    ],
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m <= 1000",
      "0 <= n <= 1000",
      "1 <= m + n <= 2000",
      "-10^6 <= nums1[i], nums2[i] <= 10^6"
    ],
    hints: [
      "The key insight is that we can partition both arrays such that the left partition has the same number of elements as the right partition.",
      "Use binary search on the smaller array to find the correct partition point."
    ],
    testCases: [
      { input: { nums1: [1, 3], nums2: [2] }, expectedOutput: 2.0 },
      { input: { nums1: [1, 2], nums2: [3, 4] }, expectedOutput: 2.5 },
      { input: { nums1: [0, 0], nums2: [0, 0] }, expectedOutput: 0.0 }
    ],
    solutions: [
      {
        language: "JavaScript",
        code: `function findMedianSortedArrays(nums1, nums2) {
    if (nums1.length > nums2.length) {
        return findMedianSortedArrays(nums2, nums1);
    }
    
    const m = nums1.length;
    const n = nums2.length;
    let left = 0;
    let right = m;
    
    while (left <= right) {
        const partitionX = Math.floor((left + right) / 2);
        const partitionY = Math.floor((m + n + 1) / 2) - partitionX;
        
        const maxLeftX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
        const minRightX = partitionX === m ? Infinity : nums1[partitionX];
        
        const maxLeftY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
        const minRightY = partitionY === n ? Infinity : nums2[partitionY];
        
        if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
            if ((m + n) % 2 === 0) {
                return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
            } else {
                return Math.max(maxLeftX, maxLeftY);
            }
        } else if (maxLeftX > minRightY) {
            right = partitionX - 1;
        } else {
            left = partitionX + 1;
        }
    }
}`,
        timeComplexity: "O(log(min(m,n)))",
        spaceComplexity: "O(1)"
      }
    ],
    relatedTopics: ["Array", "Binary Search", "Divide and Conquer"],
    premium: true
  },
  {
    id: "regular-expression-matching",
    title: "Regular Expression Matching",
    difficulty: "Hard",
    category: "String",
    companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple", "Uber", "Adobe"],
    acceptanceRate: 28.1,
    description: `Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:

- '.' Matches any single character.
- '*' Matches zero or more of the preceding element.

The matching should cover the entire input string (not partial).`,
    examples: [
      {
        input: "s = \"aa\", p = \"a\"",
        output: "false",
        explanation: "\"a\" does not match the entire string \"aa\"."
      },
      {
        input: "s = \"aa\", p = \"a*\"",
        output: "true",
        explanation: "'*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes \"aa\"."
      },
      {
        input: "s = \"ab\", p = \".*\"",
        output: "true",
        explanation: "\".*\" means \"zero or more (*) of any character (.)\"."
      }
    ],
    constraints: [
      "1 <= s.length <= 20",
      "1 <= p.length <= 20",
      "s contains only lowercase English letters.",
      "p contains only lowercase English letters, '.', and '*'.",
      "It is guaranteed for each appearance of the character '*', there will be a previous valid character to match."
    ],
    hints: [
      "Use dynamic programming to solve this problem.",
      "Consider all possible cases for each character in the pattern."
    ],
    testCases: [
      { input: { s: "aa", p: "a" }, expectedOutput: false },
      { input: { s: "aa", p: "a*" }, expectedOutput: true },
      { input: { s: "ab", p: ".*" }, expectedOutput: true },
      { input: { s: "aab", p: "c*a*b" }, expectedOutput: true }
    ],
    solutions: [
      {
        language: "JavaScript",
        code: `function isMatch(s, p) {
    const m = s.length;
    const n = p.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(false));
    
    dp[0][0] = true;
    
    for (let j = 2; j <= n; j += 2) {
        if (p[j - 1] === '*') {
            dp[0][j] = dp[0][j - 2];
        }
    }
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (p[j - 1] === '*') {
                dp[i][j] = dp[i][j - 2] || 
                          (dp[i - 1][j] && (s[i - 1] === p[j - 2] || p[j - 2] === '.'));
            } else {
                dp[i][j] = dp[i - 1][j - 1] && (s[i - 1] === p[j - 1] || p[j - 1] === '.');
            }
        }
    }
    
    return dp[m][n];
}`,
        timeComplexity: "O(m*n)",
        spaceComplexity: "O(m*n)"
      }
    ],
    relatedTopics: ["String", "Dynamic Programming", "Recursion"],
    premium: true
  },
  {
    id: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Array",
    companies: ["Amazon", "Google", "Microsoft", "Facebook", "Apple", "Uber", "Adobe", "Bloomberg"],
    acceptanceRate: 54.2,
    description: `You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.`,
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation: "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49."
      },
      {
        input: "height = [1,1]",
        output: "1"
      }
    ],
    constraints: [
      "n == height.length",
      "2 <= n <= 10^5",
      "0 <= height[i] <= 10^4"
    ],
    hints: [
      "Use two pointers approach starting from both ends.",
      "Move the pointer with the smaller height towards the center."
    ],
    testCases: [
      { input: { height: [1, 8, 6, 2, 5, 4, 8, 3, 7] }, expectedOutput: 49 },
      { input: { height: [1, 1] }, expectedOutput: 1 },
      { input: { height: [4, 3, 2, 1, 4] }, expectedOutput: 16 }
    ],
    solutions: [
      {
        language: "JavaScript",
        code: `function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let maxArea = 0;
    
    while (left < right) {
        const area = Math.min(height[left], height[right]) * (right - left);
        maxArea = Math.max(maxArea, area);
        
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxArea;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)"
      }
    ],
    relatedTopics: ["Array", "Two Pointers", "Greedy"],
    premium: false
  },
  {
    id: "3sum",
    title: "3Sum",
    difficulty: "Medium",
    category: "Array",
    companies: ["Amazon", "Google", "Microsoft", "Facebook", "Apple", "Uber", "Adobe", "Bloomberg"],
    acceptanceRate: 32.1,
    description: `Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.`,
    examples: [
      {
        input: "nums = [-1,0,1,2,-1,-4]",
        output: "[[-1,-1,2],[-1,0,1]]",
        explanation: "nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0. nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0. The distinct triplets are [-1,0,1] and [-1,-1,2]. Notice that the order of the output and the order of the triplets does not matter."
      },
      {
        input: "nums = [0,1,1]",
        output: "[]",
        explanation: "The only possible triplet does not sum up to 0."
      },
      {
        input: "nums = [0,0,0]",
        output: "[[0,0,0]]",
        explanation: "The only possible triplet sums up to 0."
      }
    ],
    constraints: [
      "3 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5"
    ],
    hints: [
      "Sort the array first to make it easier to avoid duplicates.",
      "Use two pointers approach after fixing one element."
    ],
    testCases: [
      { input: { nums: [-1, 0, 1, 2, -1, -4] }, expectedOutput: [[-1, -1, 2], [-1, 0, 1]] },
      { input: { nums: [0, 1, 1] }, expectedOutput: [] },
      { input: { nums: [0, 0, 0] }, expectedOutput: [[0, 0, 0]] }
    ],
    solutions: [
      {
        language: "JavaScript",
        code: `function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        let left = i + 1;
        let right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return result;
}`,
        timeComplexity: "O(n^2)",
        spaceComplexity: "O(1)"
      }
    ],
    relatedTopics: ["Array", "Two Pointers", "Sorting"],
    premium: false
  },
  {
    id: "longest-palindromic-substring",
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    category: "String",
    companies: ["Amazon", "Google", "Microsoft", "Facebook", "Apple", "Uber", "Adobe", "Bloomberg"],
    acceptanceRate: 31.2,
    description: `Given a string s, return the longest palindromic substring in s.`,
    examples: [
      {
        input: "s = \"babad\"",
        output: "\"bab\"",
        explanation: "\"aba\" is also a valid answer."
      },
      {
        input: "s = \"cbbd\"",
        output: "\"bb\""
      }
    ],
    constraints: [
      "1 <= s.length <= 1000",
      "s consist of only digits and English letters."
    ],
    hints: [
      "Use expand around centers approach.",
      "Consider both odd and even length palindromes."
    ],
    testCases: [
      { input: { s: "babad" }, expectedOutput: "bab" },
      { input: { s: "cbbd" }, expectedOutput: "bb" },
      { input: { s: "a" }, expectedOutput: "a" }
    ],
    solutions: [
      {
        language: "JavaScript",
        code: `function longestPalindrome(s) {
    if (!s || s.length < 1) return "";
    
    let start = 0;
    let end = 0;
    
    for (let i = 0; i < s.length; i++) {
        const len1 = expandAroundCenter(s, i, i);
        const len2 = expandAroundCenter(s, i, i + 1);
        const len = Math.max(len1, len2);
        
        if (len > end - start) {
            start = i - Math.floor((len - 1) / 2);
            end = i + Math.floor(len / 2);
        }
    }
    
    return s.substring(start, end + 1);
}

function expandAroundCenter(s, left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
        left--;
        right++;
    }
    return right - left - 1;
}`,
        timeComplexity: "O(n^2)",
        spaceComplexity: "O(1)"
      }
    ],
    relatedTopics: ["String", "Dynamic Programming"],
    premium: false
  },
  {
    id: "zigzag-conversion",
    title: "Zigzag Conversion",
    difficulty: "Medium",
    category: "String",
    companies: ["Amazon", "Google", "Microsoft", "Facebook", "Apple", "Uber", "Adobe"],
    acceptanceRate: 42.1,
    description: `The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

P   A   H   N
A P L S I I G
Y   I   R

And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number of rows:

string convert(string s, int numRows);`,
    examples: [
      {
        input: "s = \"PAYPALISHIRING\", numRows = 3",
        output: "\"PAHNAPLSIIGYIR\""
      },
      {
        input: "s = \"PAYPALISHIRING\", numRows = 4",
        output: "\"PINALSIGYAHRPI\"",
        explanation: "P     I    N\nA   L S  I G\nY A   H R\nP     I"
      },
      {
        input: "s = \"A\", numRows = 1",
        output: "\"A\""
      }
    ],
    constraints: [
      "1 <= s.length <= 1000",
      "s consists of English letters (lower-case and upper-case), ',' and '.'.",
      "1 <= numRows <= 1000"
    ],
    hints: [
      "Simulate the zigzag pattern by tracking which row each character belongs to.",
      "Use direction to determine whether to move up or down in the zigzag."
    ],
    testCases: [
      { input: { s: "PAYPALISHIRING", numRows: 3 }, expectedOutput: "PAHNAPLSIIGYIR" },
      { input: { s: "PAYPALISHIRING", numRows: 4 }, expectedOutput: "PINALSIGYAHRPI" },
      { input: { s: "A", numRows: 1 }, expectedOutput: "A" }
    ],
    solutions: [
      {
        language: "JavaScript",
        code: `function convert(s, numRows) {
    if (numRows === 1) return s;
    
    const rows = Array(numRows).fill('');
    let currentRow = 0;
    let goingDown = false;
    
    for (const char of s) {
        rows[currentRow] += char;
        
        if (currentRow === 0 || currentRow === numRows - 1) {
            goingDown = !goingDown;
        }
        
        currentRow += goingDown ? 1 : -1;
    }
    
    return rows.join('');
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)"
      }
    ],
    relatedTopics: ["String"],
    premium: false
  },
  {
    id: "reverse-integer",
    title: "Reverse Integer",
    difficulty: "Medium",
    category: "Math",
    companies: ["Amazon", "Google", "Microsoft", "Facebook", "Apple", "Uber", "Adobe", "Bloomberg"],
    acceptanceRate: 27.1,
    description: `Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).`,
    examples: [
      {
        input: "x = 123",
        output: "321"
      },
      {
        input: "x = -123",
        output: "-321"
      },
      {
        input: "x = 120",
        output: "21"
      }
    ],
    constraints: [
      "-2^31 <= x <= 2^31 - 1"
    ],
    hints: [
      "Use modulo and division to extract digits.",
      "Check for overflow before adding the next digit."
    ],
    testCases: [
      { input: { x: 123 }, expectedOutput: 321 },
      { input: { x: -123 }, expectedOutput: -321 },
      { input: { x: 120 }, expectedOutput: 21 },
      { input: { x: 0 }, expectedOutput: 0 }
    ],
    solutions: [
      {
        language: "JavaScript",
        code: `function reverse(x) {
    let result = 0;
    const INT_MAX = Math.pow(2, 31) - 1;
    const INT_MIN = -Math.pow(2, 31);
    
    while (x !== 0) {
        const pop = x % 10;
        x = Math.trunc(x / 10);
        
        if (result > INT_MAX / 10 || (result === INT_MAX / 10 && pop > 7)) return 0;
        if (result < INT_MIN / 10 || (result === INT_MIN / 10 && pop < -8)) return 0;
        
        result = result * 10 + pop;
    }
    
    return result;
}`,
        timeComplexity: "O(log(x))",
        spaceComplexity: "O(1)"
      }
    ],
    relatedTopics: ["Math"],
    premium: false
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "String",
    companies: ["Amazon", "Google", "Microsoft", "Meta (Facebook)", "Apple", "Bloomberg", "Plaid", "Capital One"],
    acceptanceRate: 37.8,
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      {
        input: 's = "()"',
        output: "true"
      },
      {
        input: 's = "()[]{}"',
        output: "true"
      },
      {
        input: 's = "(]"',
        output: "false"
      }
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    hints: [
      "Use a stack to keep track of opening brackets.",
      "When you encounter a closing bracket, check if it matches the most recent opening bracket."
    ],
    testCases: [
      { input: { s: "()" }, expectedOutput: true },
      { input: { s: "()[]{}" }, expectedOutput: true },
      { input: { s: "(]" }, expectedOutput: false },
      { input: { s: "([)]" }, expectedOutput: false }
    ],
    solutions: [
      {
        language: "JavaScript",
        code: `function isValid(s) {
    const stack = [];
    const mapping = { ')': '(', '}': '{', ']': '[' };
    
    for (const char of s) {
        if (char in mapping) {
            const topElement = stack.length ? stack.pop() : '#';
            if (mapping[char] !== topElement) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)"
      }
    ],
    relatedTopics: ["String", "Stack"],
    premium: false
  },
  {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "Dynamic Programming",
    companies: ["Amazon", "Google", "Microsoft", "Apple", "Meta (Facebook)", "Bloomberg", "Adobe", "Capital One"],
    acceptanceRate: 51.3,
    description: `You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    examples: [
      {
        input: "n = 2",
        output: "2",
        explanation: "There are two ways to climb to the top. 1. 1 step + 1 step 2. 2 steps"
      },
      {
        input: "n = 3",
        output: "3",
        explanation: "There are three ways to climb to the top. 1. 1 step + 1 step + 1 step 2. 1 step + 2 steps 3. 2 steps + 1 step"
      }
    ],
    constraints: [
      "1 <= n <= 45"
    ],
    hints: [
      "This is a classic dynamic programming problem.",
      "Think about the Fibonacci sequence - the number of ways to reach step n is the sum of ways to reach step n-1 and step n-2."
    ],
    testCases: [
      { input: { n: 2 }, expectedOutput: 2 },
      { input: { n: 3 }, expectedOutput: 3 },
      { input: { n: 4 }, expectedOutput: 5 },
      { input: { n: 5 }, expectedOutput: 8 }
    ],
    solutions: [
      {
        language: "JavaScript",
        code: `function climbStairs(n) {
    if (n <= 2) return n;
    
    let prev2 = 1;
    let prev1 = 2;
    
    for (let i = 3; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)"
      }
    ],
    relatedTopics: ["Math", "Dynamic Programming", "Memoization"],
    premium: false
  },
  {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Array",
    companies: ["Amazon", "Google", "Microsoft", "Apple", "Meta (Facebook)", "Bloomberg", "Adobe", "Plaid", "Capital One"],
    acceptanceRate: 48.9,
    description: `Given an integer array nums, find the subarray with the largest sum, and return its sum.`,
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6."
      },
      {
        input: "nums = [1]",
        output: "1",
        explanation: "The subarray [1] has the largest sum 1."
      },
      {
        input: "nums = [5,4,-1,7,8]",
        output: "23",
        explanation: "The subarray [5,4,-1,7,8] has the largest sum 23."
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    hints: [
      "Use Kadane's algorithm - keep track of the maximum sum ending at each position.",
      "If the current sum becomes negative, reset it to 0."
    ],
    testCases: [
      { input: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] }, expectedOutput: 6 },
      { input: { nums: [1] }, expectedOutput: 1 },
      { input: { nums: [5, 4, -1, 7, 8] }, expectedOutput: 23 },
      { input: { nums: [-1] }, expectedOutput: -1 }
    ],
    solutions: [
      {
        language: "JavaScript",
        code: `function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)"
      }
    ],
    relatedTopics: ["Array", "Divide and Conquer", "Dynamic Programming"],
    premium: false
  }
];

export const categories = [
  "Array", "String", "Hash Table", "Dynamic Programming", "Math", "Sorting",
  "Greedy", "Depth-First Search", "Database", "Breadth-First Search", "Tree",
  "Binary Search", "Matrix", "Two Pointers", "Bit Manipulation", "Stack",
  "Backtracking", "Design", "Graph", "Simulation", "Linked List", "Heap (Priority Queue)",
  "Union Find", "Sliding Window", "Trie", "Recursion", "Binary Tree", "Divide and Conquer",
  "Memoization", "Queue", "Binary Search Tree", "Segment Tree", "Ordered Set", "Geometry",
  "Topological Sort", "Number Theory", "Hash Function", "Interactive", "String Matching",
  "Rolling Hash", "Shortest Path", "Game Theory", "Data Stream", "Combinatorics",
  "Randomized", "Monotonic Stack", "Iterator", "Merge Sort", "Concurrency", "Doubly-Linked List",
  "Brainteaser", "Probability and Statistics", "Quickselect", "Bucket Sort", "Suffix Array",
  "Minimum Spanning Tree", "Counting Sort", "Shell", "Line Sweep", "Reservoir Sampling",
  "Eulerian Circuit", "Radix Sort", "Strongly Connected Component", "Rejection Sampling",
  "Biconnected Component"
];

export const companies = [
  "Google", "Amazon", "Microsoft", "Meta (Facebook)", "Apple", "Netflix", "Uber", "Airbnb",
  "Bloomberg", "Adobe", "Twitter", "LinkedIn", "Snapchat", "Pinterest", "Dropbox",
  "Salesforce", "Oracle", "IBM", "Intel", "Nvidia", "Tesla", "SpaceX", "Palantir",
  "Stripe", "Square", "PayPal", "Visa", "Mastercard", "Goldman Sachs", "JPMorgan",
  "Morgan Stanley", "Citadel", "Two Sigma", "Jane Street", "DE Shaw", "Hudson River Trading",
  "Akuna Capital", "Optiver", "IMC", "Flow Traders", "DRW", "Jump Trading", "Virtu Financial",
  "Plaid", "Capital One", "American Express", "Wells Fargo", "Bank of America", "Chase",
  "Shopify", "Spotify", "Zoom", "Slack", "Atlassian", "Snowflake", "Databricks",
  "MongoDB", "Redis", "Elastic", "Twilio", "SendGrid", "Mailchimp", "HubSpot",
  "ServiceNow", "Workday", "Salesforce", "Tableau", "Looker", "Figma", "Canva",
  "Robinhood", "Coinbase", "Kraken", "Binance", "Gemini", "FTX", "Crypto.com"
];

export const difficulties = ["Easy", "Medium", "Hard"] as const;

export function getProblemsByCompany(company: string): Problem[] {
  return problems.filter(problem => problem.companies.includes(company));
}

export function getProblemsByDifficulty(difficulty: 'Easy' | 'Medium' | 'Hard'): Problem[] {
  return problems.filter(problem => problem.difficulty === difficulty);
}

export function getProblemsByCategory(category: string): Problem[] {
  return problems.filter(problem => problem.category === category);
}

export function getProblemById(id: string): Problem | undefined {
  return problems.find(problem => problem.id === id);
}
